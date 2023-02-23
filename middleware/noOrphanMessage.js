module.exports = {
    noOrphanMessage: async ({ event, logger, next }) => {
        if (event.thread_ts) {
            logger.info('Message is a thread reply');
            await next();
        } else if (event.channel_type === 'im') {
            logger.info('Message is a direct message');
            await next();
        }
    }
}