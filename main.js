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
    bounds: {maxX: 600, maxY: 600}
    //, players: []
};

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('send message', function (data) {
        console.log(data);
        // send message back to the client
        socket.emit('news', { news: data });
    
        // send message out to all OTHER clients
        socket.broadcast.emit('news', { news: data });
    });
    socket.on('move', function(data) {
        data.id = socket.id;
        socket.broadcast.emit('move', data); 
    });
    socket.on('name', function(data) {
        data.id = socket.id;
        socket.broadcast.emit('name', data); 
    });
    socket.on('disconnect', function(data) {
       socket.broadcast.emit('died', {id: socket.id});
    });
});