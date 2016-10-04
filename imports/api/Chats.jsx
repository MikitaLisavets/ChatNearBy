import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chats', function tasksPublication() {
    return Chats.find({});
  });
}

Meteor.methods({
  'chats.insert'(param) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Chats.insert({
      title: param.title,
      lat: param.lat,
      lng: param.lng,
      createdAt: new Date(),
      owner: this.userId
    });
  },

  'chats.remove'(taskId) {
    Chats.remove(taskId);
  }
});