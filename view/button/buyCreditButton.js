module.exports = {
    buyCreditButton: (team_id) => {
        return {
            "type": "button",
            "style": "primary",
            "text": {
                "type": "plain_text",
                "text": "Buy credit",
                "emoji": true
            },
            "value": team_id,
            "url": `${process.env.PAYMENT_PAGE_URL}&team=${team_id}`,
            "action_id": "buy_credit"
        }
    },
    buyMoreCreditButton: (team_id) => {
        return {
            "type": "button",
            "style": "primary",
            "text": {
                "type": "plain_text",
                "text": "Buy more credit",
                "emoji": true
            },
            "value": team_id,
            "url": `${process.env.PAYMENT_PAGE_URL}&team=${team_id}`,
            "action_id": "buy_credit"
        }
    },
}