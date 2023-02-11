const { api } = require('../../api/bigrr-be');
const { getUserToken } = require('../../api/make');
const modalBuilder = require('../../outgoing/modal');
const blocks = require('../../outgoing/blocks');

module.exports = {
  replyMessage: async ({ client, body, ack, logger }) => {

    // Acknowledge the action
    await ack();

    logger.info(body)
    const booking_id = body.actions[0].value.split('/')[0];
    const message_ts = body.actions[0].value.split('/')[1];

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
          title: modalBuilder.title('Reply Message'),
          blocks: blocks.loading(),
          close: modalBuilder.close('Close')
        }
      });
      // logger.info(result);
      view_id = result.view.id;
    }
    catch (error) {
      logger.error(error);
    }

    // Get data from API
    // Get email from slack
    const email = await client.users.info({ user: body.user.id });

    // Get user token from make
    const userToken = await getUserToken(email.user.profile.email);
    let data = {};
    try {
      const [details, notes] = await Promise.all([
        api('get', `/v1/bookings/${booking_id}`),
        api('get', `/v1/bookings/${booking_id}/notes`)
      ]);
      data = { details: details, notes: notes };
    }
    catch (error) {
      await client.views.update({
        view_id: view_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'reply_message',
          title: modalBuilder.title('Reply Message'),
          blocks: blocks.errorBlocks(error),
          close: modalBuilder.close('Close')
        }
      });
      logger.error(error);
    }

    try {
      const result = await client.views.update({
        view_id: view_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'reply_message',
          private_metadata: body.actions[0].value,
          title: modalBuilder.title('Reply Message'),
          blocks: blocks.replyMessageBlocks(data),
          submit: modalBuilder.submit('Submit'),
          close: modalBuilder.close('Close')
        }
      });
      // logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
  }
}