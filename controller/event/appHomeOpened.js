const supabase = require('../../api/supabase');

const home = require('../../view/home');

module.exports = {
    appHomeOpened: async ({ event, logger, body, client }) => {
        logger.info("appHomeOpened", event.type, event.tab);
        // logger.info(body)

        if (event.tab === 'home' && !body.auth.activated) {
            logger.info("appHomeOpened", "Inactive user", event.user)
            // New user here

            // Add inactive user to supabase
            await supabase.upsertTeam({ team_id: body.team_id });

            // Publish the inactive home tab
            body.event.user = event.user;
            await client.views.publish({
                user_id: event.user,
                view: home.inactiveTeam(body)
            });

        } else if (event.tab === 'home' && body.auth.activated) {

            const data = {
                user: event.user,
                team_id: body.team_id,
                credit: body.auth.credit
            }

            const view = home.activeTeam(data);
            view.private_metadata = JSON.stringify(data);
            await client.views.publish({
                user_id: event.user,
                view: view
            });
        }
    }
};