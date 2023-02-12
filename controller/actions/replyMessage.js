const { api } = require('../../api/bigrr-be');
const modal = require('../../view/modal');
const blocks = require('../../view/blocks');

module.exports = {
  replyMessage: async ({ client, body, ack, logger }) => {
    logger.info("action.replyMessage")
    // logger.info(body)

    // Acknowledge the action
    await ack();

    // logger.info(body)
    const booking_id = body.actions[0].value.split('/')[0];
    const message_ts = body.message.ts;
    const channel_id = body.channel.id;
    const original_blocks = body.message.blocks;
    const private_metadata = { booking_id: booking_id, message_ts: message_ts, channel_id: channel_id, original_blocks: original_blocks };

    // Show loading modal for long process
    let view_id;
    try {
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'loading',
          title: modal.title('Reply Message'),
          blocks: blocks.sectionBlock("Loading..."),
          close: modal.close('Close')
        }
      });
      logger.info("Show loading modal")
      // logger.info(result);
      view_id = result.view.id;
    }
    catch (error) {
      logger.error(error);
    }

    const errorHandler = async (error) => {
      await client.views.update({
        view_id: view_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'reply_message',
          title: modal.title('Reply Message'),
          blocks: blocks.sectionBlock(error),
          close: modal.close('Close')
        }
      });
    }

    // Get data from API
    // Get email from slack
    // TODO : Pass user ID instead, and get email from API, cache the entire data
    const email = await client.users.info({ user: body.user.id });

    // Add to private_metadata
    private_metadata.email = email.user.profile.email;

    let data = {};
    try {
      logger.info("Get data from API")
      const [details, notes] = await Promise.all([
        api({
          method: 'get',
          url: `/v1/bookings/${booking_id}`,
          email: email.user.profile.email
        }),
        api({
          method: 'get',
          url: `/v1/bookings/${booking_id}/notes`,
          email: email.user.profile.email
        })
      ]);

      if (details.success && notes.success) {
        data = { details: details.data, notes: notes.data };
        try {
          await client.views.update({
            view_id: view_id,
            // View payload
            view: {
              type: 'modal',
              callback_id: 'reply_message',
              private_metadata: JSON.stringify(private_metadata),
              title: modal.title('Reply Message'),
              blocks: blocks.replyMessageBlocks(data),
              submit: modal.submit('Submit'),
              close: modal.close('Close')
            }
          });
          logger.info("Update reply message modal with full conversations")
        }
        catch (error) {
          logger.error(error);
        }
      } else {
        errorHandler(`${details.message}`);
      }
    }
    catch (error) {
      errorHandler(error);
      logger.error(error);
    }


  }
}