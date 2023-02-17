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
                "block_id": "team_action",
                "elements": [
                    button.buyCreditButton(team_id),
                    button.applyCreditButton(team_id)
                ]
            }
        ]
        return blocks;
    }
}