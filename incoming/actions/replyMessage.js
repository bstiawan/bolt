const { api } = require('../../api/bigrr-be');
const modalBuilder = require('../../outgoing/modal');
const blocks = require('../../outgoing/blocks');

module.exports = {
  replyMessage: async ({ client, body, ack, logger }) => {

    // Acknowledge the action
    await ack();

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
          title: modalBuilder.title('Conversation'),
          blocks: blocks.loading(),
          close: modalBuilder.close('Close')
        }
      });
      logger.info(result);
      view_id = result.view.id;
    }
    catch (error) {
      logger.error(error);
    }

    // Get data from API
    const details = await api('get', '/v1/bookings/HMJH3ZEKJ5');
    const notes = await api('get', '/v1/bookings/HMJH3ZEKJ5/notes');
    const data = { details, notes };
    try {
      const result = await client.views.update({
        view_id: view_id,
        // View payload
        view: {
          type: 'modal',
          callback_id: 'conversation_reply',
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