module.exports = {
    noOrphanMessage: async ({ event, logger, next }) => {
        if (event.thread_ts || event.channel_type === 'im') {
            // logger.info('Message is not a bot message');
            await next();
        }
    }
}