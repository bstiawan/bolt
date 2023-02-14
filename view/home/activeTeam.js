const button = require('../button');

module.exports = {
    activeTeam: ({ user, team_id, credit }) => {
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
                        "text": "Great to see you here! WhatGPT enables you to ask question directly from Slack. These are just a few things which you will be able to do:"
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
                        "text": `🎉 Your team is activated and you have *${credit}* credits. You can use these credits to ask questions. If you run out of credits, you can buy more credits. You can also apply credits to your team.`
                    }
                },
                {
                    "type": "actions",
                    "block_id": "team_action",
                    "elements": [
                        button.buyMoreCreditButton(team_id),
                        button.applyCreditButton(team_id),
                    ]
                }
            ]
        }
    }
}