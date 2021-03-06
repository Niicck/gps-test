var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var calc = require(__dirname + '/helpers/index.js');

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

  socket.on('location', function (data) {
    io.broadcast.emit('location', data);
  });

  socket.on('new-location', function(data){
    var item = {
      lat: 34.0191826,
      long: -118.4942513,
      type: "flag",
      range: 5,
    }
    var dist = calc.haversine(data.lat, data.long, item.lat, item.long);
    console.log(data.username, "Distance from target", dist);
    io.emit('chat-broadcast', data.username + "'s distance from target: " + dist.toString());
    if (calc.withinRange(data.lat, data.long, item.lat, item.long, item.range)){
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
