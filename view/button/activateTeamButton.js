module.exports = {
    activateTeamButton: (team_id) => {
        return {
            "type": "button",
            "style": "primary",
            "text": {
                "type": "plain_text",
                "text": "Activate team",
                "emoji": true
            },
            "value": team_id,
            "action_id": "activate_team"
        }


    }
}