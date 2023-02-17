const { api } = require('../../api/bigrr-be');
const modal = require('../../view/modal');
const blocks = require('../../view/blocks');

module.exports = {
    applyCredit: async ({ client, body, ack, logger }) => {
        logger.info("applyCredit", body.actions[0].action_id)
        // logger.info(body)

        // Acknowledge the action
        await ack();

        const private_metadata = {
            team_id: body.user.team_id
        };

        await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: 'modal',
                callback_id: 'apply_credit',
                private_metadata: JSON.stringify(private_metadata),
                title: modal.title('Apply Credit'),
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Now loading..."
                        }
                    }
                ],
                close: modal.close('Cancel'),
                submit: modal.submit('Apply'),
            }
        });
        logger.info("applyCredit", "Show modal")
        // logger.info(result);
    }
}