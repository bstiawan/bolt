module.exports = {
    noBotMessages: async ({ message, logger, next }) => {
        if (!message.subtype || message.subtype !== 'bot_message') {
            logger.info('Message is not a bot message');
            await next();
        }
    }
}