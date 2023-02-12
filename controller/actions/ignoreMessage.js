const blocks = require('../../view/blocks');

module.exports = {
    ignoreMessage: async ({ body, ack, client, logger }) => {
        // Acknowledge the action
        await ack();

        console.log("ignoreMessage", body.message.ts);
        try {
            const result = await client.chat.update({
                channel: body.channel.id,
                ts: body.message.ts,
                text: `_Ignored by <@${body.user.id}>_`,
                blocks: blocks.sectionBlock(`_Ignored by <@${body.user.id}>_`)
            });
            // logger.info(result);
        }
        catch (error) {
            logger.error(error);
        }
    }
}