module.exports = {
    inactiveMessageBlocks: (team_id) => {
        const blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Your team hasn't been activated. Go to home page to activate and start using the app."
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "block_id": "home_button",
                "elements": [
                    {
                        "type": "button",
                        "style": "primary",
                        "text": {
                            "type": "plain_text",
                            "text": "Go to home page",
                            "emoji": true
                        },
                        "value": team_id,
                        "action_id": "go_to_app_home",
                        "url": `slack://app?team=${team_id}&id=${process.env.SLACK_APP_ID}&tab=home`
                    }
                ]
            }
        ]
        return blocks;
    }
}