const button = require('../button');

module.exports = {
    inactiveTeam: (body) => {
        return {
            "type": "home",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Hi <@${body.event.user}> :wave:\n\n`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "WhatGPT is designed to help you get instant answers to any question and make requests right from your Slack messages. We bring you AI-powered technology that can understand and easily process your questions and requests. Get answers quickly and make your Slack workspace more interactive and efficient. Try it out and see how much easier your conversations will become!"
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
                        button.activateTeamButton(body.team_id),
                    ]
                }
            ]
        }
    }
}