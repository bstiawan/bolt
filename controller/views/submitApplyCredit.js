const supabase = require('../../api/supabase');
const lemonsqueezy = require('../../api/lemonsqueezy');

module.exports = {
    submitApplyCredit: async ({ body, ack, logger, client }) => {
        logger.info('submitApplyCredit', body.type);
        const team = body.team.id;
        const domain = body.team.domain;
        const key = body.view.state.values.apply_credit_input.apply_credit_submit.value;

        logger.info("key", key)

        // Acknowledge the action
        await ack();

        // Check if code is valid
        const activate = await lemonsqueezy.activate(key, team);
        // Retrieve licence key

        // If activated
        if (activate.activated) {

            const credit = activate.meta.variant_name.split(" ")[0];

            // Retrieve team from database
            const user = await supabase.fetchTeam(team);
            // // Store licence key in database and associate with team

            //Upsert team credit
            const upsert = await supabase.upsertTeam({
                team_id: team,
                domain: domain,
                credit: +user.credit + +credit,
            });

            // Send direct message to user that code is successfully applied
            await client.chat.postMessage({
                channel: body.user.id,
                text: `:tada: Your code has been successfully applied! You now have ${upsert.credit} credits.`
            });
        } else {
            // Send direct message to user that code is invalid
            await client.chat.postMessage({
                channel: body.user.id,
                text: `Sorry, your code is invalid. ${activate.error}`
            });
        }
    }
}