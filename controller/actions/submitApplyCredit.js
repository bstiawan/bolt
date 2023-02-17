const supabase = require('../../api/supabase');
const gumroad = require('../../api/gumroad');
const home = require('../../view/home');

module.exports = {
    submitApplyCredit: async ({ body, ack, logger, client }) => {
        logger.info('submitApplyCredit', body.type);
        const team = body.team.id;
        const domain = body.team.domain;
        const key = body.actions[0].value;
        const private_metadata = JSON.parse(body.view.private_metadata);

        // logger.info("key", key)

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

            // Construct the view
            const activeTeam = home.activeTeam({ "user": body.user.id, "team_id": team, "credit": upsert.credit });
            activeTeam.blocks.splice(1, 2);
            activeTeam.blocks.splice(2, 0, {
                "type": "context",
                "elements": [
                    {
                        "type": "plain_text",
                        "text": `:tada: Your code has been successfully applied! ${credit} credits has been added.`,
                        "emoji": true
                    }
                ]
            })

            await client.views.publish({
                user_id: body.user.id,
                view: activeTeam
            });
        } else if (license.uses > 1) {

            // Construct the view
            const activeTeam = home.activeTeam(private_metadata);
            activeTeam.blocks.splice(2, 0, {
                "type": "context",
                "elements": [
                    {
                        "type": "plain_text",
                        "text": ":warning: Sorry, your code has been used already.",
                        "emoji": true
                    }
                ]
            })

            await client.views.publish({
                user_id: body.user.id,
                view: activeTeam
            });
        }
    }
}