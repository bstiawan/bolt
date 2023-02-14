module.exports = {
    applyCreditButton: (team_id) => {
        return {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Apply credit",
                "emoji": true
            },
            "value": team_id,
            "action_id": "apply_credit"
        }
    }
}