module.exports = {
    conversationReply: (data) => {
        const blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Here's the conversation about *${data.guest.name}* at *${data.listing.property.name}*.`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Wayan*\nPrivate walk-in bathroom. TV. Heating. Kitchen with microwave, basic cooking utensils, wine glasses and silverware."
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "23 Jan 2023, 14:00"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "|"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "Staff"
                    }
                ]
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "plain_text_input-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Reply",
                    "emoji": true
                }
            }
        ]
        return blocks;
    }
}