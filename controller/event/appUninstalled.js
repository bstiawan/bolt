

module.exports = {
    appUninstalled: async ({ say, logger, body }) => {
        logger.info("appUninstalled", body.event.type, body.team_id);
        // logger.info(body)
    }
}