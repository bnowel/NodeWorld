var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app),
    Person = require('./static/js/person/person'),
    helper = require('./static/js/helper/helper'),
    Message = require('./static/js/message/message');
    
var people = (function() { 
    var index = 1; 
    return { 
        add : function(person) { 
            var id = index++; 
            person.setId(id);
            this[id.toString()] = person;
            return person;
        }
    }
})();

app.listen(process.env.C9_PORT || process.env.PORT || 3000);
app.use(express.bodyParser());

app.post('/person/add', function(req, res){
   var p = people.add(new Person(req.body));
   
   // res.send expects a string. Give it what it wants
   res.send(JSON.stringify(helper.flattify(p)));
});

// If we don't get a person by this id return an empty object
app.get('/person/:id', function(req, res) {
    console.log(req.params.id);
    var p = helper.flattify(people[req.params.id]);
    console.log(p);
    res.send(JSON.stringify(p));
});

app.post('/message/send', function(req, res) {
    var m = new Message(req.body);
    var mFlat = helper.flattify(m);

    res.send(JSON.stringify(mFlat));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/simpleClient.html');
});