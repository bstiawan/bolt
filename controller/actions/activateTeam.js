const supabase = require('../../api/supabase');

const home = require('../../view/home');

module.exports = {
    activateTeam: async ({ body, ack, client, logger }) => {
        // Acknowledge the action
        await ack();
        logger.info('activateTeam', body.user.team_id);

        const upsert = await supabase.upsertTeam({
            team_id: body.user.team_id,
            activated: true,
            credit: +10
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