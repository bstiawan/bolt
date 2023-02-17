const supabase = require('../api/supabase');

const blocks = require('../view/blocks')

module.exports = {
    authentication: async ({ body, client, next, logger }) => {
        logger.info('authentication', body.event.type);
        const auth = body.authorizations[0];

        try {
            const user = await supabase.fetchTeam(auth.team_id);
            // console.log(user)

            if (!user) {
                // Team hasn't been activated
                await client.chat.postEphemeral({
                    channel: body.event.channel,
                    user: auth.user_id,
                    text: `Your team hasn't been activated. Go to <slack://app?team=${auth.team_id}&id=${process.env.SLACK_APP_ID}&tab=home|home page> to activate and start using the app.`,
                    blocks: blocks.inactiveMessageBlocks(auth.team_id)
                });
                return;
            } else {
                // When the user lookup is successful, add the user details to the context
                body.auth = user;
                await next();
            }

        } catch (error) {
            logger.info('authentication error', error);
            await client.chat.postEphemeral({
                channel: body.event.channel,
                user: auth.user_id,
                text: `Sorry, something went wrong. Please try again later.`,
            });
            return;
        }
    }
}