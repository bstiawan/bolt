module.exports = {
    submitReplyMessage: async ({ client, body, ack, logger }) => {
        // await ack();
        logger.info(body.user.id);
        logger.info(body);
        const booking_id = body.view.private_metadata.split('/')[0];

        const data = {
            "user":
            {
                "id": process.env.USER_ID,
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
        logger.info(data)

        // Send message to API
        // try {
        //     const result = await api('post', `/v1/bookings/${booking_id}/notes`, data)
        //     logger.info(result);
        // }
        // catch (error) {
        //     logger.error(error);
        // }


        // Reply as thread
    }
}