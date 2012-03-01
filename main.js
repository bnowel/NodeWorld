var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.configure(function(){
      app.use(express.static(__dirname + '/static'));
      //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.bodyParser());
  });

app.listen(process.env.C9_PORT || process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/simpleClient.html');
});

var world = {
    grid: []
    , players: []
    , minPlayersToStart: 4
    , addPlayer: function(player) {this.players.push(player);}
    , howManyPlayers: function() {return this.players.length;}
    , timerId: 0
    , update: function() { 
        // update ticks
        console.log("update ran");
        io.sockets.emit('update', {"hoo": "ray"});
    }
    , init: function() {
        if (this.timerId || this.howManyPlayers() < this.minPlayersToStart)
            return;
        
        this.timerId = setInterval(1000, world.update);
    }
};

io.sockets.on('connection', function (socket) {
    // Update our list of players Add me
    world.addPlayer({id: socket.id});
    world.init();
    
    socket.broadcast.emit('playerCount', {players: world.howManyPlayers()})
    socket.on('move', function(data) {
        // Update where this player wants to "move"
        data.id = socket.id;
        socket.broadcast.emit('move', data); 
    });
    
    // Initialize player (join game)
    socket.on('name', function(data) {
        data.id = socket.id;
        socket.broadcast.emit('name', data); 
    });
    socket.on('disconnect', function(data) {
        // Update our list of players remove me
       socket.broadcast.emit('died', {id: socket.id});
    });
});