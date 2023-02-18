const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
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

// Handles custom routes
const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET })
receiver.router.use(bodyParser.urlencoded({ extended: true }))
receiver.router.use(bodyParser.json())

// Initializes your app with your bot token and signing secret
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: false,
//   logLevel: LogLevel.INFO,
//   receiver
// });

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'whaaat',
  scopes: ['app_mentions:read', 'channels:history', 'chat:write', 'groups:history', 'im:history', 'mpim:history', 'users:read'],
  installationStore: {
    storeInstallation: async (installation) => {
      // Bolt will pass your handler an installation object
      // Change the lines below so they save to your database
      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
        // handle storing org-wide app installation
        console.log("storeInstallation", "isEnterpriseInstall", installation.enterprise.id)
        // return await database.set(installation.enterprise.id, installation);
      }
      if (installation.team !== undefined) {
        // single team app installation
        return await supabase.uploadFile(installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // Bolt will pass your handler an installQuery object
      // Change the lines below so they fetch from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // handle org wide app installation lookup
        console.log("fetchInstallation", "isEnterpriseInstall", installQuery.enterpriseId)
        // return await database.get(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await supabase.fetchFile(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      // Bolt will pass your handler  an installQuery object
      // Change the lines below so they delete from your database
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        // org wide app installation deletion
        console.log("deleteInstallation", "isEnterpriseInstall", installQuery.enterpriseId)
        // return await database.delete(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        return await supabase.deleteFile(installQuery.teamId);
      }
      throw new Error('Failed to delete installation');
    }
  },
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
receiver.router.get('/auth', (req, res) => { webhook.authRedirect(req, res, app) });

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