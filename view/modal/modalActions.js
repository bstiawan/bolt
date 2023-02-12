module.exports = {
    submit: (text) => {
        const submit = {
            "type": "plain_text",
            "text": text,
            "emoji": true
        }
        return submit;
    },
    close: (text) => {
        const close = {
            "type": "plain_text",
            "text": text,
            "emoji": true
        }
        return close;
    }
}