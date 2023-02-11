module.exports = {
    loading: () => {
        const loading = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Now loading..."
                }
            }
        ]
        return loading;
    }
}