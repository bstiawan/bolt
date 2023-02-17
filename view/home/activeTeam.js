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
                        "text": `🎉 Your team is activated and you have *${credit}* credits. You can use these credits to ask questions.`
                    }
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "apply_credit_input",
                    "label": {
                        "type": "plain_text",
                        "text": "Have license key? Insert below to apply the credits."
                    },
                    "element": {
                        "type": "plain_text_input",
                        "multiline": false,
                        "action_id": "apply_credit_submit"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
                            "alt_text": "placeholder"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Users using WhatGPT credits*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
                            "alt_text": "Dwight Schrute"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Dwight Schrute*"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Private message: *13 questions*\nChannel message: *9 questions*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
                            "alt_text": "Pam Beasely"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Pam Beasely*"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Private message: *13 questions*\nChannel message: *9 questions*"
                    }
                },
                {
                    "type": "actions",
                    "block_id": "team_action",
                    "elements": [
                        button.buyMoreCreditButton(team_id)
                    ]
                }
            ]
        }
    }
}