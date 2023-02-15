module.exports = {
    applyCreditBlocks: (user_id, team_id) => {
        const section = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:wave: Hey <@${user_id}>!`
                }
            },
            {
                "type": "input",
                "block_id": "apply_credit_input",
                "label": {
                    "type": "plain_text",
                    "text": "Insert your code below to apply the credits.",
                    "emoji": true
                },
                "element": {
                    "type": "plain_text_input",
                    "multiline": false,
                    "action_id": `apply_credit_submit`
                }
            }
        ]
        return section;
    }
}