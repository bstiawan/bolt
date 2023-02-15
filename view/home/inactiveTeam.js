const button = require('../button');

module.exports = {
    inactiveTeam: ({ user, team_id, credit }) => {
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
                        "text": "But before you can do all these amazing things, we need you to activate your team. Simply click the button below to get your free credits and start asking questions."
                    }
                },
                {
                    "type": "actions",
                    "block_id": "team_action",
                    "elements": [
                        button.activateTeamButton(team_id),
                    ]
                }
            ]
        }
    }
}