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
                        "text": `🎉 Your team is activated and you have *${credit}* credits. You can use these credits to ask questions. You can buy more credits and apply it below.`
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