module.exports = {
    sectionBlock: (text) => {
        const section = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": text
                }
            }
        ]
        return section;
    }
}