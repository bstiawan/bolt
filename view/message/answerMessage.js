module.exports = {
    answerMessage: (ts, text) => {
        const message = {
            thread_ts: ts,
            text: text,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": text
                    }
                }
            ]
        }
        return message;
    }
}