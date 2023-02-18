const supabase = require('../../api/supabase');

const home = require('../../view/home');

module.exports = {
    activateTeam: async ({ body, ack, client, logger }) => {
        // Acknowledge the action
        await ack();
        logger.info('activateTeam', body.user.team_id);
        logger.info(body)

        // TODO: Get app bot.info and store it in database
        const bot = await client.bots.info({
            bot: body.view.bot_id
        });
        logger.info("bot", bot.bot.id, bot.bot.name, bot.bot.user_id);

        // TODO: Update the views for loading screen first
        // Construct the view
        const activeTeam = home.inactiveTeam(body);
        activeTeam.blocks.push({
            "type": "context",
            "elements": [
                {
                    "type": "plain_text",
                    "text": "⌛ Activating... This may take a few seconds",
                    "emoji": true
                }
            ]
        })

        await client.views.publish({
            user_id: body.user.id,
            view: activeTeam
        });

        // Update the database
        const upsert = await supabase.upsertTeam({
            team_id: body.user.team_id,
            activated: true,
            credit: +10,
            bot_id: bot.bot.id,
            bot_user_id: bot.bot.user_id,
            app_id: bot.bot.app_id,
            activated_by: body.user.id,
        });

        const data = {
            user: body.user.id,
            team_id: body.user.team_id,
            credit: upsert.credit
        }

        // Update home tab view
        await client.views.publish({
            user_id: body.user.id,
            view: home.activeTeam(data)
        });

    }
}