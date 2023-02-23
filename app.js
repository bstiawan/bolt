const { App, LogLevel } = require('@slack/bolt');
const { FileInstallationStore } = require('@slack/oauth');
const bodyParser = require('body-parser')
require('dotenv').config();

const actions = require('./controller/actions');
const views = require('./controller/views');
const message = require('./controller/message');
const webhook = require('./controller/webhook');
const event = require('./controller/event');
const auth = require('./controller/auth');

const middleware = require('./middleware');

const supabase = require('./api/supabase');
const scopes = ['app_mentions:read', 'channels:history', 'chat:write', 'groups:history', 'im:history', 'mpim:history', 'users:read'];

// Authentication
const app = new App({
  LogLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  scopes: scopes,
  installationStore: new FileInstallationStore(),
  customRoutes: [
    {
      path: '/',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('Ok!');
      },
    },
    {
      path: '/install',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        // res.redirect(`https://slack.com/oauth?client_id=${process.env.SLACK_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&user_scope=&redirect_uri=&state=${process.env.SLACK_STATE_SECRET}&granular_bot_scope=1&single_channel=0&install_redirect=&tracked=1&team=`);
      },
    },
  ],
});

(async () => {
  // SSL in production
  const ssl = process.env.NODE_ENV === 'production' ? { key: process.env.TLS_PRIVATE_KEY, cert: process.env.TLS_CERT } : undefined;
  // Start your app
  await app.start(process.env.PORT || 3000, ssl);
  // https { key: process.env.TLS_PRIVATE_KEY, cert: process.env.TLS_CERT }

  console.log('⚡️ Bolt app is running!');
})();

// // Listens to incoming messages
app.message(middleware.noOrphanMessage, middleware.authentication, message.messageRouter);

// Listens to events
app.event('app_mention', middleware.authentication, event.appMention);
app.event('app_home_opened', middleware.authentication, event.appHomeOpened);
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