const supabase = require('../api/supabase');

module.exports = {
    authentication: async ({ payload, client, context, next, logger }) => {
        logger.info('authentication', payload);
        const slackUserId = payload.user;
        const helpChannelId = 'general';

        // Assume we have a function that accepts a Slack user ID to find user details from Acme
        try {
            // Assume we have a function that can take a Slack user ID as input to find user details from the provider
            const user = await supabase.fetchTeam(payload.team);

            // When the user lookup is successful, add the user details to the context
            logger.info('authentication user', user);

            if (!user) {
                // This user wasn't found in Acme. Send them an error and don't continue processing request
                await client.chat.postEphemeral({
                    channel: payload.channel,
                    user: slackUserId,
                    text: `The remaining quota for this team is 0. Purchase additional quota?`,
                    blocks: [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "The remaining credit for this team is 0. Buy more credit?"
                            }
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "actions",
                            "elements": [
                                {
                                    "type": "button",
                                    "style": "primary",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Buy credit",
                                        "emoji": true
                                    },
                                    "value": payload.team,
                                    "action_id": "buy_credit",
                                    "url": `https://iconify.lemonsqueezy.com/checkout?cart=${process.env.PAYMENT_CART_ID}`
                                },
                                {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Apply credit",
                                        "emoji": true
                                    },
                                    "value": "apply_credit",
                                    "action_id": "apply_credit"
                                },
                                {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "More info",
                                        "emoji": true
                                    },
                                    "value": payload.team,
                                    "action_id": "more_info"
                                }
                            ]
                        }
                    ]
                });
                return;
            }
            context.user = user;
        } catch (error) {
            logger.info('authentication error', error);
            // This user wasn't found in Acme. Send them an error and don't continue processing request
            await client.chat.postEphemeral({
                channel: payload.channel,
                user: slackUserId,
                text: `Sorry, something went wrong. Please try again later.`,
            });
            return;

            // Pass control to previous middleware (if any) or the global error handler
            throw error;
        }

        // Pass control to the next middleware (if there are any) and the listener functions
        // Note: You probably don't want to call this inside a `try` block, or any middleware
        //       after this one that throws will be caught by it. 
        await next();
    }
}