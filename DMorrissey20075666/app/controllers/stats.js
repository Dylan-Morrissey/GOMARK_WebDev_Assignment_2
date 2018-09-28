'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const bookmarklistStore = require('../models/bookmarklist-store');
const accounts = require ('./accounts.js');
const userstore = require('../models/user-store');
const pictureStore = require('../models/picture-store.js');


const stats = {
  index(request, response) {
    logger.info('stats rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const size = bookmarklistStore.getBookmarklistCollection().length;
    const average = (bookmarklistStore.getBookmarklistCollection().length)/(userstore.getAllUsers().length);
    const total = bookmarklistStore.getTotalNumberOfBookmarks();
    const bookmarklistId = request.params.id;
   
    const bookmarkCollections = bookmarklistStore.getUserbookmarklists(loggedInUser.id);
    let totalBookmarks = 0;
    for (let i = 0; i < bookmarkCollections.length; i++) {
      totalBookmarks = totalBookmarks + bookmarkCollections[i].bookmarks.length;
    }
    const viewData = {
      title: 'Gomark Dashboard',
      user: loggedInUser,
      bookmarklistcollection: bookmarklistStore.getUserbookmarklists(loggedInUser.id),
      usercollection: bookmarklistStore.getUserbookmarklists(loggedInUser.id).length,
      bookmark : bookmarklistStore.getuserBookmarklist(loggedInUser.id).length,
      size: size,
      average: average,
      totalBookmarks: totalBookmarks,
      bookmarklist: bookmarklistStore.getBookmarklist(bookmarklistId),
      longest: bookmarklistStore.getLongestBookmarkCollection(loggedInUser.id),
      least: bookmarklistStore.getLeastBookmarkCollection(loggedInUser.id),
      largest:bookmarklistStore.getLargestUserCollection(loggedInUser.id),
      smallest:bookmarklistStore.getLeastUserCollection(loggedInUser.id),
      total: total,
      album: pictureStore.getAlbum(loggedInUser.id),
      
    };
    logger.info('about to render', viewData.bookmarklistcollection);
    response.render('stats', viewData);
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

};

module.exports = stats;
