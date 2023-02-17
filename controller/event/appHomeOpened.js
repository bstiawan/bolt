const supabase = require('../../api/supabase');

const home = require('../../view/home');

module.exports = {
    appHomeOpened: async ({ event, logger, body, client }) => {
        logger.info("appHomeOpened", event.type, event.tab);
        // logger.info(body)

        if (event.tab === 'home' && event.view === undefined) {
            logger.info("appHomeOpened", "new user", event.user)
            // New user here

            // Add inactive user to supabase
            await supabase.upsertTeam({ team_id: body.team_id });

            // Publish the inactive home tab
            await client.views.publish({
                user_id: event.user,
                view: home.inactiveTeam(body)
            });

        } else if (event.tab === 'home' && event.view) {

            // Check if user is active
            const team = await supabase.fetchTeam(body.team_id);

            const data = {
                user: event.user,
                team_id: body.team_id,
                credit: team.credit
            }

            if (team && team.activated) {
                const view = home.activeTeam(data);
                view.private_metadata = JSON.stringify(data);
                await client.views.publish({
                    user_id: event.user,
                    view: view
                });
            } else if (team && !team.activated) {
                const view = home.activeTeam(data);
                view.private_metadata = JSON.stringify(data);
                await client.views.publish({
                    user_id: event.user,
                    view: view
                });
            } else { }


        }
    }
};