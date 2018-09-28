'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');


const picture = {
  index(request, response) {
    logger.info('picture rendering');
    const loggedInUser = accounts.getCurrentUser(request);

    const viewData = {
       album: pictureStore.getAlbum(loggedInUser.id),
    }
    response.render('picture', viewData);
  },
    deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/picture');
  },


  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/picture');
  },
  
    uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/picture');
    });
  },
};

module.exports = picture;