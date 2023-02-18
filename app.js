const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
const bodyParser = require('body-parser')
require('dotenv').config();

const actions = require('./controller/actions');
const views = require('./controller/views');
const message = require('./controller/message');
const webhook = require('./controller/webhook');
const event = require('./controller/event');

const middleware = require('./middleware');

// Handles custom routes
const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET })
receiver.router.use(bodyParser.urlencoded({ extended: true }))
receiver.router.use(bodyParser.json())

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  logLevel: LogLevel.INFO,
  receiver
});

(async () => {
  // SSL in production
  const ssl = process.env.NODE_ENV === 'production' ? { key: process.env.TLS_PRIVATE_KEY, cert: process.env.TLS_CERT } : undefined;
  // Start your app
  await app.start(process.env.PORT || 3000, ssl);
  // https { key: process.env.TLS_PRIVATE_KEY, cert: process.env.TLS_CERT }

  console.log('⚡️ Bolt app is running!');
})();

// Listens to incoming webhooks
receiver.router.get('/', (req, res) => { res.end('Ok'); });
receiver.router.post('/webhook/lemonsqueezy', (req, res) => { res.end('Ok'); webhook.lemonSqueezy(req, app) });
receiver.router.post('/auth', (req, res) => { res.end('Ok'); console.log(req.body) });

// // Listens to incoming messages
app.message(middleware.noOrphanMessage, middleware.authentication, message.messageRouter);

// Listens to events
app.event('app_mention', middleware.authentication, event.appMention);
app.event('app_home_opened', event.appHomeOpened);
app.event('app_uninstalled', middleware.authentication, event.appUninstalled);

// Listens to errors
app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

// // Listens to actions
app.action({ block_id: 'team_action', action_id: 'activate_team' }, actions.activateTeam);
app.action({ block_id: 'team_action', action_id: 'apply_credit' }, actions.applyCredit);
app.action({ block_id: 'team_action', action_id: 'buy_credit' }, actions.buyCredit);
app.action({ block_id: 'home_button', action_id: 'go_to_app_home' }, actions.buyCredit);
app.action({ block_id: 'apply_credit_input', action_id: 'apply_credit_submit' }, actions.submitApplyCredit);

// // Listens to view submissions
app.view({ callback_id: "apply_credit" }, views.submitApplyCredit);