'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');


const share = {
  index(request, response) {
    logger.info('share rendering');


    const viewData = {
      bookmarklistcollection: bookmarklistStore.getBookmarklistCollection(),
      size : bookmarklistStore.getBookmarklistCollection().length,
    };
    logger.info('about to render', viewData.bookmarklistcollection);
    response.render('share', viewData);
  },
  };

module.exports = share;
