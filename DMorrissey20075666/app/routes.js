'use strict';

const express = require('express');
const router = express.Router();


const accounts = require ('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const share = require('./controllers/share.js');
const picture = require('./controllers/picture.js');
const stats = require('./controllers/stats.js');
const bookmarklist = require('./controllers/bookmarklist.js');



router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/share' , share.index);
router.get('/picture' , picture.index);
router.get('/stats' , stats.index);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.post('/dashboard/addbookmarklist', dashboard.addBookmarklist);
router.get('/dashboard/deletebookmarklist/:id', dashboard.deleteBookmarklist);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);

router.get('/about', about.index);
router.post('/addmessage', about.addMessage);

router.get('/bookmarklist/:id', bookmarklist.index);
router.get('/bookmarklist/:id/deletebookmark/:bookmarkid', bookmarklist.deleteBookmark);
router.post('/bookmarklist/:id/addbookmark', bookmarklist.addBookmark);



module.exports = router;
