const supabase = require('../api/supabase');

module.exports = {
    authentication: async ({ payload, client, context, next, logger }) => {
        logger.info('authentication', payload.user, payload.team);
        const slackUserId = payload.user;

        try {
            const user = await supabase.fetchTeam(payload.team);

            if (!user) {
                // This user wasn't found in Acme. Send them an error and don't continue processing request
                await client.chat.postEphemeral({
                    channel: payload.channel,
                    user: slackUserId,
                    text: `Your team hasn't been activated. Go to <slack://app?team=${payload.team}&id=${process.env.SLACK_APP_ID}&tab=home|home page> to activate and start using the app.`,
                    blocks: [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Your team hasn't been activated. Go to home page to activate and start using the app."
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
                                        "text": "Go to home page",
                                        "emoji": true
                                    },
                                    "value": payload.team,
                                    "action_id": "go_to_app_home",
                                    "url": `slack://app?team=${payload.team}&id=${process.env.SLACK_APP_ID}&tab=home`
                                }
                            ]
                        }
                    ]
                });
                return;
            } else if (user && user.credit <= 0) {
                // No credit left
                await client.chat.postEphemeral({
                    channel: payload.channel,
                    user: slackUserId,
                    text: `The remaining credit for this team is 0. Buy more credit?`,
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
            } else if (user && user.credit > 0) {
                // Continue but deduct 1 credit
                await supabase.upsertTeam({ team_id: payload.team, credit: user.credit - 1 });
            }

            // When the user lookup is successful, add the user details to the context
            context.user = user;
        } catch (error) {
            logger.info('authentication error', error);
            await client.chat.postEphemeral({
                channel: payload.channel,
                user: slackUserId,
                text: `Sorry, something went wrong. Please try again later.`,
            });
            return;

            // Pass control to previous middleware (if any) or the global error handler
            // throw error;
        }

        // Pass control to the next middleware (if there are any) and the listener functions
        // Note: You probably don't want to call this inside a `try` block, or any middleware
        //       after this one that throws will be caught by it. 
        await next();
    }
}