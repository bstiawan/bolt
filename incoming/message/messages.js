module.exports = {
    hello: async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say({
          blocks: [
            {
                type: "section",
                block_id: "message-from-partner",
                text: {
                    type: "mrkdwn",
                    text: `_New Message From Booking ID: *HMDSKFHD*_\n<https://bigrr.bukitvista.com|Booking Details>`,
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
                        value: "reply_message",
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
        ],
          text: `_New Message From Booking ID: *HMDSKFHD*`
        });
      }
}