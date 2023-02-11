module.exports = {
    ignoreMessage: async ({ body, ack, client, logger }) => {
        // Acknowledge the action
        await ack();

        console.log(body);
        try {
            const result = await client.chat.update({
                channel: body.channel.id,
                ts: body.message.ts,
                blocks: blocks.conversationReply(data)
            });
            logger.info(result);
        }
        catch (error) {
            logger.error(error);
        }
    }
}