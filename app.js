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
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

// Listens to incoming webhooks
receiver.router.get('/', (req, res) => { res.end('Ok'); });
// receiver.router.post('/webhook', (req, res) => { res.end('Ok'); webhook.notesWebhook(req, app) });

// // Listens to incoming messages
app.message(middleware.noOrphanMessage, middleware.authentication, message.messageRouter);

// Listens to events
app.event('app_mention', middleware.authentication, event.appMention);
app.event('app_home_opened', event.appHomeOpened);

// Listens to errors
app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

// TODO: Add team to database when added to workspace


// // Listens to actions
app.action({ block_id: 'team_action', action_id: 'activate_team' }, actions.activateTeam);
// app.action({ block_id: 'message_action', action_id: 'ignore_message' }, actions.ignoreMessage);

// // Listens to view submissions
// app.view({ callback_id: "reply_message" }, views.submitReplyMessage);