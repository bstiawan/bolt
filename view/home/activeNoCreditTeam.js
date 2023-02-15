const button = require('../button');

module.exports = {
    activeNoCreditTeam: ({ user, team_id, credit }) => {
        return {
            "type": "home",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Hi <@${user}> :wave:`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Great to see you here! \nWhatGPT allows you to ask question directly in Slack and get answer. These are just a few things which you will be able to do:"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "• Mention @WhatGPT in a public channel and get answer \n • Send direct message and get answer"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "0️⃣ Your team is run out of credits. You can buy credits and apply it below."
                    }
                },
                {
                    "type": "actions",
                    "block_id": "team_action",
                    "elements": [
                        button.buyCreditButton(team_id),
                        button.applyCreditButton(team_id)
                    ]
                }
            ]
        }
    }
}