const openai = require('../../api/openai');
const message = require('../../view/message');

module.exports = {
    appMention: async ({ event, say, logger, body }) => {
        logger.info("appMention", event.type, event.text);
        // logger.info(body)

        const response = await openai.completion(event.text, body);

        try {
            await say(response);
        }
        catch (error) {
            console.error(error);
        };
    }
}