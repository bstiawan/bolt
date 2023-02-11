module.exports = {
    messageFromPartner: async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say({
          blocks: [
            {
              "type": "section",
              "block_id": "message_action",
              "text": {
                "type": "mrkdwn",
                "text": `Hey there <@${message.user}>\n${context}!`
              },
              "accessory": {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Click Me"
                },
                "action_id": "button_click"
              }
            }
          ],
          text: `Hey there <@${message.user}>!`
        });
      }
}