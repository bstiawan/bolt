const blocks = require('../blocks')

module.exports = {
    noCreditMessage: (ts, text, team_id) => {
        const message = {
            thread_ts: ts,
            text: text,
            blocks: blocks.noCreditMessageBlocks(team_id)
        }
        return message;
    }
}