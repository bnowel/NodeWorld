var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app),
    _ = require("./static/js/underscore"),
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
world.setPlayerDiedCallback(function(player) {
  io.sockets.emit('playerDied', {id: player.id, name: player.name, color: player.color})
});

io.sockets.on('connection', function (socket) {
    // Update our list of players Add me
    
    var player = {id: socket.id, pos:{x:0, y:0}, dir:{x:0, y:0}, name:"Anon"};
    world.addPlayer(player);
    io.sockets.emit('playerJoined', player);
    world.init();
    
    socket.broadcast.emit('playerCount', {players: world.howManyPlayers()});
    socket.on('move', function(data) {
        // Update where this player wants to "move"
        data.id = socket.id;
        //socket.broadcast.emit('move', data); 
    });
    
    // Initialize player (join game)
    socket.on('name', function(data) {
        console.log(data.name +" name updated");
        data.id = socket.id;
        data.oldName = world.getPlayerNameById(socket.id);
        data.color = world.getPlayerColorById(socket.id);
        io.sockets.emit('updateName', data);
        world.updatePlayerById(socket.id, {"name":data.name, "oldName":data.oldName});
    });
    
    // God commands
    socket.on('god', function(data){
    	world.godSays(data);
    });
    
    socket.on('dir', function(data) {
        console.log(data);
        
        world.updatePlayerDirById(socket.id, data.dir);
    });
    
    socket.on('chat', function(data) {
        console.log("Chat: " + data.message);
        
        var msg = world.addChatMessage(data.message, socket.id);
        console.log(msg);
        socket.broadcast.emit('chat', msg);
        socket.emit('chat', msg);
    });

    socket.on('resetGame', function() {
        io.sockets.emit('resetGame');
        world.resetGame();
        
    });

    socket.on('rejoinGame', function() {
        io.sockets.emit('rejoinGame', player);
    });


    socket.on('disconnect', function() {
        console.log('player disconnected');
        world.removePlayerById(socket.id);
        socket.broadcast.emit('died', {id: socket.id});
    });
});
