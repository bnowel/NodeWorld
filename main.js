// This code is pulled straight from https://github.com/LearnBoost/Socket.IO
// It's a stub for something that will work eventually.
var port = process.env.C9_PORT || process.env.PORT || 3000;

var io = require('socket.io').listen(port);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('this', { will: 'be received by everyone' });

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});