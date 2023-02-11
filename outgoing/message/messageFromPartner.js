module.exports = {
  messageFromPartner: async ({ message, say, logger }) => {
    let booking_id = "HMT58C4TBW"

    logger.info(message);
    // say() sends a message to the channel where the event was triggered
    await say({
      text: `_New Message From Booking ID: *${booking_id}*`,
      blocks: [
        {
          type: "section",
          block_id: "message-from-partner",
          text: {
            type: "mrkdwn",
            text: `_New Message From Booking ID: *${booking_id}*_\n<https://bigrr.bukitvista.com/guest-checkin-list/${booking_id}/messages|Booking Details>`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Wayan*\nHalo, saya ingin bertanya tentang booking saya. Apakah bisa saya tanya?`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "actions",
          block_id: "message_action",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Reply"
              },
              value: `${booking_id}/${message.ts}`,
              action_id: "reply_message",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Ignore"
              },
              value: "ignore_message",
              action_id: "ignore_message",
            },
          ],
        },
      ]
    });
  }
}