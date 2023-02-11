module.exports = {
    messageIgnored: (data) => {
        const blocks = [
            {
                type: "section",
                block_id: "message-from-partner",
                text: {
                    type: "mrkdwn",
                    text: `_New Message From Booking ID: *HMDSKFHD*_`,
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `_Message ignored by <@${data.user.id}>_`,
                },
            }
        ];
        return blocks;
    }
}