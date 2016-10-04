import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/Chats';

var chatLiveLimit = 24 * 60 * 60 * 1000,
    checkTime = 60 * 1000;

// Meteor.setInterval(()=> {
//   Chats.find().map( function(chat) {
//     if(chat.createdAt.getTime() + chatLiveLimit <= new Date()) {
//       Chats.remove(chat._id);
//     }
//   });
// }, checkTime)