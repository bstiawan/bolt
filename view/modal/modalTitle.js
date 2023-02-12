module.exports = {
    title: (text) => {
        const title = {
            "type": "plain_text",
            "text": text,
            "emoji": true
        }
        return title;
    }
}