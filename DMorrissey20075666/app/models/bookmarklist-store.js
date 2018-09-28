'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const userstore = require('../models/user-store');

const bookmarklistStore = {

  store: new JsonStore('./models/bookmarklist-store.json', { bookmarklistCollection: [] }),
  collection: 'bookmarklistCollection',

  getBookmarklistCollection() {
    return this.store.findAll(this.collection);
  },
  
    getuserbookmarklistCollection(userid) {
    return this.store.findAll(this.collection, { userid: userid });
  },
  
   getuserBookmarklist(id) {
    return this.store.findBy(this.collection, { id: id });
  }, 
  
  getBookmarklist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmarklist(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmarklist(id) {
    const bookmark = this.getBookmarklist(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmarklists() {
    this.store.removeAll(this.collection);
  },

  addBookmark(id, bookmark) {
    const bookmarklist = this.getBookmarklist(id);
    bookmarklist.bookmarks.push(bookmark);
  },

  removeBookmark(id, bookmarkId) {
    const bookmarklist = this.getBookmarklist(id);
    const bookmarks = bookmarklist.bookmarks;
    _.remove(bookmarks, { id: bookmarkId});
  },
  
    getUserbookmarklists(userid) {
     return this.store.findBy(this.collection, { userid: userid });
  },
  
  getuserbookmarklistCollection(userid){
    return this.store.findBy(this.collection,{ userid: userid});
  },
  
   getLargestUserCollection(userid){
   const collection = this.getuserbookmarklistCollection(userid);
   const user = userstore.getAllUsers();
   let largest = 0;
     if (collection.length > 0) {
       for(let j=0; j<user.length; j++){
         for (let i = 0; i < collection.length; i++) {
           if (collection[largest].bookmarks.length < collection[i].bookmarks.length) {
             largest = i;
             collection[largest].userid;
           }
         }
       }
     }else{
        return '';
      }
  return collection[largest].userid;
},
  
   getLeastUserCollection(userid){
   const collection = this.getuserbookmarklistCollection(userid);
   const user = userstore.getAllUsers();
   let least = 0;
     if (collection.length > 0) {
       for(let j=0; j<user.length; j++){
         for (let i = 0; i < collection.length; i++) {
           if (collection[least].bookmarks.length > collection[i].bookmarks.length) {
             least = i;
           }
         }
       }
     }else{
        return '';
      }
  return collection[least].userid;
},
  
  getLongestBookmarkCollection(userid){
  const collection = this.getuserbookmarklistCollection(userid);  
  let longestIndex = 0;
  if (collection.length > 0) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[longestIndex].bookmarks.length < collection[i].bookmarks.length) {
        longestIndex = i;       
      }
    }
  }else{
    return '';
  }
  return collection[longestIndex].title;
},
  
   getLeastBookmarkCollection(userid){
   const collection = this.getuserbookmarklistCollection(userid);
   let leastIndex = 0;  
   if (collection.length > 0) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[leastIndex].bookmarks.length > collection[i].bookmarks.length) {
          leastIndex = i; 
        }
    }
   }else{
     return '';
   }
  return collection[leastIndex].title;
},
  
  getTotalNumberOfBookmarks(userid) {
    const collection = this.getBookmarklistCollection(userid);
    let total = 0;
    for (let i=0; i<collection.length; i++) {
      total = total + collection[i].bookmarks.length;
    }
    return total;
  }
};

module.exports = bookmarklistStore;
