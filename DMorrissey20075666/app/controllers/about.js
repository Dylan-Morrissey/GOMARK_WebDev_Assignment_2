'use strict';

const logger = require('../utils/logger');
const messageStore = require('../models/message-store');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About Gomark 1',
      messages: messageStore.getAllMessages(),
    };
    response.render('about', viewData);
  },

  addMessage(request, response) {
    const message = request.body.message;
    logger.info('message recieved' + message);
    const newMessage = {
      messagetext: message,
    };
    messageStore.addMessage(newMessage);
    response.redirect ('/about');
},
};

module.exports = about;
