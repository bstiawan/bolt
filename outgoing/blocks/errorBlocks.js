module.exports = {
    errorBlocks: (text) => {
        const loading = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Error: ${text}`
                }
            }
        ]
        return loading;
    }
}