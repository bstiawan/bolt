const { api } = require('../../api/bigrr-be');
const blocks = require('../../view/blocks');

module.exports = {
    submitReplyMessage: async ({ body, ack, logger, client }) => {
        await ack();
        logger.info(body.user.id, "sending reply message");
        // logger.info(body);
        const { booking_id, email, message_ts, channel_id } = JSON.parse(body.view.private_metadata);

        const data = {
            "user":
            {
                "name": body.user.name
            },
            "booking":
            {
                "id": booking_id
            },
            "comment":
            {
                "title": body.user.name,
                "type": 1,
                "text": body.view.state.values.reply_message.reply_message.value,
                "image_url": ""
            }
        }

        // Send message to API
        try {
            const result = await api({
                method: 'post',
                url: `/v1/bookings/${booking_id}/notes`,
                data: data,
                email: email
            })
            logger.info(result.message);
        }
        catch (error) {
            logger.error(error);
        }

        // Update message
        const payload = {
            channel: channel_id,
            ts: message_ts,
            text: `_Replied by <@${body.user.id}>_`,
            blocks: blocks.sectionBlock(`_Replied by <@${body.user.id}>_`)
        }
        // logger.info(JSON.stringify(payload))
        await client.chat.update(payload);


        // Reply as thread
    }
}