module.exports = {
    ignoreMessage: async ({ ack, say }) => {
        // Acknowledge the action
        await ack();
        await say('Message ignored');
    }
}