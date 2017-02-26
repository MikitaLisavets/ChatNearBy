const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const mongoClient = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const chatLiveLimit = 24 * 60 * 60 * 1000; // 24h
const checkTime = 60 * 1000; // 1m


app.use(express.static('public'));
app.use(express.static('dist'));

if (process.env.NODE_ENV !== 'prod') {
  app.use(webpackDevMiddleware(webpack(webpackConfig)));
}

mongoClient.connect('mongodb://admin:admin@ds161039.mlab.com:61039/chatnearby', (err, db) => {
  if (err) throw err;

  server.listen(3000, function() {console.log('listen:3000')});


  // checkAvailability();
  // setInterval(checkAvailability, checkTime);

  function checkAvailability() {
    db.collection('chats').find().map( function(chat) {
      if(chat.updatedAt && new Date() > chat.updatedAt.getTime() + chatLiveLimit) {
        db.collection('chats').findOne(chat._id).remove();
      }
    });
  }

});