const supabase = require('../../api/supabase');
const gumroad = require('../../api/gumroad');

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
        const license = await gumroad.verifyLicense(key, team);
        // Retrieve licence key

        // TODO: Check if this user already get free credit

        // If activated
        if (license.uses === 1) {

            // Retrieve team from database
            const user = await supabase.fetchTeam(team);

            //Upsert team credit
            const credit = license.purchase.variants.replace('(', '').split(" ")[0];
            const upsert = await supabase.upsertTeam({
                team_id: team,
                domain: domain,
                credit: +user.credit + +credit,
            });

            // Insert licence key in database
            await supabase.insertLicense({
                id: key,
                email: license.purchase.email,
                variants: license.purchase.variants,
                team_id: team,
                user_id: body.user.id,
            });

            // Send direct message to user that code is successfully applied
            await client.chat.postMessage({
                channel: body.user.id,
                text: `:tada: Your code has been successfully applied! You now have ${upsert.credit} credits.`
            });
        } else if (license.uses > 1) {
            // Send direct message to user that code is invalid
            await client.chat.postMessage({
                channel: body.user.id,
                text: `Sorry, your code has been used already.`
            });
        }
    }
}