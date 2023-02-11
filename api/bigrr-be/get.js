const axios = require("axios");

module.exports = {
    get: async ({ ack, say }) => {
        // Acknowledge the action
        await ack();
        await say('Message ignored');
    }
}