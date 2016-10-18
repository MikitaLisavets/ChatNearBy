import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chats', function tasksPublication() {
    return Chats.find({});
  });
}

Meteor.methods({
  'chats.insert'(params) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let now = new Date();
    Chats.insert({
      title: params.title,
      lat: params.lat,
      lng: params.lng,
      createdAt: now,
      updatedAt: now,
      owner: this.userId,
      history: []
    });
  },

  'chats.update'(params) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Chats.update({ _id: params.chatId }, {
      $set: {
        updatedAt: params.updatedAt,
        history: params.history
      }
    });
  },

  'chats.remove'(chatId) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Chats.remove(chatId);
  },

  'chats.find'(chatId) {
    return Chats.findOne({_id: chatId});
  }
});