module.exports = {
    goToAppHome: async ({ body, ack, logger }) => {
        logger.info("buyCredit", body.actions[0].action_id, body.actions[0].value)

        // Acknowledge the action
        await ack();

    }
}