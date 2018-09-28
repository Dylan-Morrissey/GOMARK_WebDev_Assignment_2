'use strict';

const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const bookmarklist = {
  index(request, response) {
    const bookmarklistId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Bookmark id = ', bookmarklistId);
    const viewData = {
      title: 'Bookmark',
      bookmarklist: bookmarklistStore.getBookmarklist(bookmarklistId),
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    response.render('bookmarklist', viewData);
  },
     deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },


  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
  
    uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/dashboard');
    });
  },


  deleteBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarkId = request.params.bookmarkid;
    logger.debug(`Deleting Song ${bookmarkId} from Playlist ${bookmarklistId}`);
    bookmarklistStore.removeBookmark(bookmarklistId, bookmarkId);
    response.redirect('/bookmarklist/' + bookmarklistId);
  },

  addBookmark(request, response) {
    const bookmarklistId = request.params.id;
    const bookmarklist = bookmarklistStore.getBookmarklist(bookmarklistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      link: request.body.link,
      summary: request.body.summary,
    };
    bookmarklistStore.addBookmark(bookmarklistId, newSong);
    response.redirect('/bookmarklist/' + bookmarklistId);
  },
};

module.exports =  bookmarklist;
