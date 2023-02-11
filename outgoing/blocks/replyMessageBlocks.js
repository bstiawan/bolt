module.exports = {
    replyMessageBlocks: (data) => {

        const details_blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Here's the conversation about *${data.details.guest.name}* at *${data.details.listing.property.name}*.`
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Booking ID*\n<${data.details.booking.conversation_url}|${data.details.booking.id}>`
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Date*\n`" + data.details.booking.check_in
                            + "` to `" + data.details.booking.check_out + "`"
                    }
                ]
            }
        ]

        const notes_blocks = data.notes.map(note => {
            const divider = {
                "type": "divider"
            };

            const note_block = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*${note.user.name}*\n${note.text}`
                }
            };

            if (note.image_url.length != 0) {
                note_block.accessory = {
                    "type": "image",
                    "image_url": note.image_url,
                    "alt_text": "image"
                }
            }

            const context = {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `*${note.created_at}*`
                    }
                ]
            };

            return [divider, note_block, context];
        });

        details_blocks.push(...notes_blocks.flat());

        details_blocks.push(
            {
                "type": "input",
                "block_id": "reply_message",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "reply_message"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Reply",
                    "emoji": true
                }
            }
        );

        // console.info(JSON.stringify(blocks))
        return details_blocks;
    }
}