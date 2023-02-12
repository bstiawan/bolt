const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
const bodyParser = require('body-parser')
require('dotenv').config();

const actions = require('./controller/actions');
const views = require('./controller/views');
const message = require('./controller/message');
const webhook = require('./controller/webhook');

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

// Listens to incoming messages
app.message('hello', message.messageFromPartner);

// Listens to actions
app.action({ block_id: 'message_action', action_id: 'reply_message' }, actions.replyMessage);
app.action({ block_id: 'message_action', action_id: 'ignore_message' }, actions.ignoreMessage);

// Listens to view submissions
app.view({ callback_id: "reply_message" }, views.submitReplyMessage);

app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

// Listens to incoming webhooks
receiver.router.get('/', (req, res) => { res.end('Ok'); });
receiver.router.post('/notes', (req, res) => { res.end('Ok'); webhook.notesWebhook(req, app) });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();