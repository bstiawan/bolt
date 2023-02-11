const { App, LogLevel } = require('@slack/bolt');

const actions = require('./incoming/actions');
const { hello } = require('./incoming/message/messages');

const { messageFromPartner } = require('./outgoing/message/outgoingMessages');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.INFO,
  customRoutes: [
    {
      path: '/',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('Health check information displayed here!');
      },
    },
  ],
});


// Listens to incoming messages
app.message('hello', hello);

// Listens to actions
app.action({block_id: 'message_action', action_id: 'reply_message'}, actions.replyMessage);
app.action({block_id: 'message_action', action_id: 'ignore_message'}, actions.ignoreMessage);

app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();