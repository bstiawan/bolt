module.exports = {
  messageFromPartner: async ({ message, say, logger }) => {
    logger.info("messageFromPartner");

    let data = {
      action: 'notes.insert',
      user: {
        id: '636f47ff0e60892f71e9afa4',
        name: 'Krisan Satri',
        type: 'partner',
        role: 'Staff'
      },
      booking: { id: 'HMAB2ZYTXD' },
      comment: {
        title: 'Krisan Satri commented',
        text: 'siang team. tolong info ke tamunya jam cek outnya. saya mau bersih kamar',
        image_url: 'https://api.slack.com/img/blocks/bkb_template_images/onboardingComplex.jpg'
      }
    }

    const image_block = {
      "type": "image",
      "title": {
        "type": "plain_text",
        "text": "image"
      },
      "image_url": data.comment.image_url,
      "alt_text": "image"
    }

    // say() sends a message to the channel where the event was triggered
    await say({
      text: `*${data.user.name}* • ${data.user.role}\n${data.comment.text}`,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*${data.user.name}* • ${data.user.role}\n${data.comment.text}`
          }
        },
        image_block,
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:house: ${data.user.type} | 📖 ${data.booking.id} | 🔗 <https://bigrr.bukitvista.com/guest-checkin-list/${data.booking.id}/messages|BIGRR>`
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "actions",
          "block_id": "message_action",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Reply"
              },
              "value": `${data.booking.id}`,
              "action_id": "reply_message"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Ignore"
              },
              "value": "ignore_message",
              "action_id": "ignore_message"
            }
          ]
        }
      ]
    });
  }
}