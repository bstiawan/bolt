const { api } = require('../../api/bigrr-be');
const modal = require('../../view/modal');
const blocks = require('../../view/blocks');

module.exports = {
    applyCredit: async ({ client, body, ack, logger }) => {
        logger.info(new Date().toLocaleString('id-ID'), "applyCredit", body.actions[0].action_id)
        // logger.info(body)

        // Acknowledge the action
        await ack();

        const private_metadata = {
            team_id: body.user.team_id
        };

        try {
            logger.info(new Date().toLocaleString('id-ID'), "applyCredit", "Try")
            const show = await client.views.open({
                // Pass a valid trigger_id within 3 seconds of receiving it
                trigger_id: body.trigger_id,
                // View payload
                view: {
                    type: 'modal',
                    // View identifier
                    callback_id: 'view_1',
                    title: {
                        type: 'plain_text',
                        text: 'Modal title'
                    },
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: 'Welcome to a modal with _blocks_'
                            },
                            accessory: {
                                type: 'button',
                                text: {
                                    type: 'plain_text',
                                    text: 'Click me!'
                                },
                                action_id: 'button_abc'
                            }
                        },
                        {
                            type: 'input',
                            block_id: 'input_c',
                            label: {
                                type: 'plain_text',
                                text: 'What are your hopes and dreams?'
                            },
                            element: {
                                type: 'plain_text_input',
                                action_id: 'dreamy_input',
                                multiline: true
                            }
                        }
                    ],
                    submit: {
                        type: 'plain_text',
                        text: 'Submit'
                    }
                }
            });
            logger.info(new Date().toLocaleString('id-ID'), "applyCredit", "Show modal", show.ok)
            // logger.info(result);
        }
        catch (error) {
            logger.error(error);
        }
        logger.info(new Date().toLocaleString('id-ID'), "applyCredit", "End")

    }
}