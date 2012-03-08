var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app),
    world = require("./static/js/world");

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

app.configure(function(){
      app.use(express["static"](__dirname + '/static'));
      //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.bodyParser());
  });

app.listen(process.env.C9_PORT || process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/simpleClient.html');
});
world.setIo(io);

io.sockets.on('connection', function (socket) {
    // Update our list of players Add me
    world.addPlayer({id: socket.id});
    world.init();
    
    socket.broadcast.emit('playerCount', {players: world.howManyPlayers()});
    socket.on('move', function(data) {
        // Update where this player wants to "move"
        data.id = socket.id;
        //socket.broadcast.emit('move', data); 
    });
    
    // Initialize player (join game)
    socket.on('name', function(data) {
        data.id = socket.id;
        socket.broadcast.emit('name', data); 
    });
    
    // God commands
    socket.on('god', function(data){
    	world.godSays(data);
    });
    
    socket.on('dir', function(data) {
        switch (data.dir) {
          case 'w'; break;
          case 'n'; break;
          case 'e'; break;
          case 's'; break;
        } 
    });
    
    socket.on('disconnect', function() {
        console.log('player disconnected');
        world.removePlayerById(socket.id);
        socket.broadcast.emit('died', {id: socket.id});
    });
});