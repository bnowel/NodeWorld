var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app),
    world = require("./static/js/world");

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
    socket.on('disconnect', function() {
        // Update our list of players remove me
       socket.broadcast.emit('died', {id: socket.id});
    });
});