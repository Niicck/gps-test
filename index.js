var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
<<<<<<< HEAD
var withinRange = require('helpers/index.js').withinRange;
=======
var withinRange = require(__dirname + '/helpers/index.js').withinRange;
>>>>>>> fc24f22ba041b32060b12fd5c3e46ab4f0692d0b
var usernames = [];
var target = {
  lat: 34.0192699,
  long: -118.4943795
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // console.log('socket object: ', socket);
  socket.on('save-user', function(username){
    usernames.push(username);
    io.emit('online-list', usernames);
    console.log('usernames sent to clients: ', usernames);
  });

  socket.on('new-location', function(data){
    //console.log('message: ' + data);

    // if (Math.abs(data.lat - target.lat) < 0.000025 && Math.abs(data.long - target.long) < 0.000025) {
    //   io.emit('chat-broadcast', data.username + " COLLISION WITH TARGET!");
    // } else {
    //   io.emit('chat-broadcast', data.username + " position: " + data.lat + data.long);
    //}
    var item = {
      lat: 34.019297,
      long: -118.494642,
      type: "flag",
      range: 15
    }

    if (withinRange(data.lat, data.long, item.lat, item.long, item.range)){
      io.emit('chat-broadcast', data.username + " COLLISION WITH TARGET!");
    } else {
      io.emit('chat-broadcast', data.username + " position: " + data.lat + ', ' + data.long);
    }
  });

  socket.on('chat-message', function (msg) {
    io.emit('chat-broadcast', msg.username + ": " + msg.text);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected :(');
  });
});

var port = process.env.PORT || 5000;

http.listen(port, function(){
  console.log('listening on port: ', port);
});
