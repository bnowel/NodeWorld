var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.configure(function(){
      app.use(express.static(__dirname + '/static'));
      //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.bodyParser());
  });
app.listen(process.env.PORT);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/simpleClient.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});