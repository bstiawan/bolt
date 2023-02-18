const supabase = require('../../api/supabase');

module.exports = {
    authRedirect: async (req, res, app) => {
        app.logger.info("authRedirect", req.url)

        const data = req.params;

        // Exchange oauth code for access token
        const access = await app.client.oauth.v2.access({
            // The code param is returned via the redirect from the Slack OAuth flow
            code: data.code,
            // This is the same as verification token in your App config
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET
        })

        // If access is ok, store token to database
        if (access.ok) {
            // Store the token in a database
            await supabase.upsertTeam({
                team_id: access.team.id,
                access_token: access.access_token,
                app_id: access.app_id,
                bot_user_id: access.bot_user_id,
                team_name: access.team.name,
            });

            res.redirect(`https://slack.com/app_redirect?app=${process.env.SLACK_APP_ID}&team=${access.team.id}`)
        }
    }

}
