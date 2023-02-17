const button = require('../button');

module.exports = {
    noCreditMessageBlocks: (team_id) => {
        const blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "The remaining credit for this team is 0. Go to home page to get more credit."
                }
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