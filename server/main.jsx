import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/Chats';

let chatLiveLimit = 24 * 60 * 60 * 1000, // 24h
    checkTime = 60 * 1000; // 1m

let checkAvailability = function() {
  Chats.find().map( function(chat) {
    if(chat.updatedAt && new Date() > chat.updatedAt.getTime() + chatLiveLimit) {
      Chats.remove(chat._id);
    }
  });
};

checkAvailability();
Meteor.setInterval(checkAvailability, checkTime)