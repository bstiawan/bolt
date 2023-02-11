const { api } = require('../../api/bigrr-be');
const modalBuilder = require('../../outgoing/modal');
const blocks = require('../../outgoing/blocks');

module.exports = {
  replyMessage: async ({ client, body, ack, logger }) => {

    // Acknowledge the action
    await ack();

    // Get data from API
    const data = await api('get', '/v1/bookings/HMMXZWWBX4');

    // Call views.open with the built-in client
    try {
      // Call views.open with the built-in client
      const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'view_1',
          title: modalBuilder.title('Conversation'),
          blocks: blocks.conversationReply(data),
          submit: modalBuilder.submit('Submit'),
          close: modalBuilder.close('Close')
        }
      });
      logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
  }
}