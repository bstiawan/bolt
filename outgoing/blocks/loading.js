module.exports = {
    loading: () => {
        const loading = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Loading..."
                }
            }
        ]
        return loading;
    }
}