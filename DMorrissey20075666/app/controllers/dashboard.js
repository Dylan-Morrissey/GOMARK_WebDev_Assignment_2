'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const size = bookmarklistStore.getBookmarklistCollection().length;
    const total = bookmarklistStore.getTotalNumberOfBookmarks();
    const Picture = {album: pictureStore.getAlbum(loggedInUser.id),
         bookmarklistcollection: bookmarklistStore.getUserbookmarklists(loggedInUser.id)};
    
    const viewData = {
      title: 'Gomark Dashboard',
      user: loggedInUser,
      bookmarklistcollection: bookmarklistStore.getUserbookmarklists(loggedInUser.id),
      usercollection: bookmarklistStore.getUserbookmarklists(loggedInUser.id).length,
      bookmark : bookmarklistStore.getTotalNumberOfBookmarks(loggedInUser.id),
      size: size,
      Picture:Picture,
      total: total,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    logger.info('about to render', viewData.bookmarklistcollection);
    response.render('dashboard', viewData);
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
      const newBookmarklist = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      bookmarks: [],
    };
    bookmarklistStore.addBookmarklist(newBookmarklist);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function ()
  {
      response.redirect('/dashboard');
    });

  },
  deleteBookmarklist(request, response) {
    const bookmarklistId = request.params.id;
    logger.debug(`Deleting Bookmarklist ${bookmarklistId}`);
    bookmarklistStore.removeBookmarklist(bookmarklistId);
    response.redirect('/dashboard');
  },

  addBookmarklist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newBookmarklist = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      bookmarks: [],
    };
    logger.debug('Creating a new Bookmarklist', newBookmarklist);
    bookmarklistStore.addBookmarklist(newBookmarklist);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;

