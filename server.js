var express = require('express'), 
    app = express.createServer(),
    io = require('socket.io').listen(app),
    Person = require('./static/js/person/person')
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
})()

app.listen(process.env.C9_PORT || process.env.PORT || 3000);
app.use(express.bodyParser());
app.post('/person/add', function(req, res){
   console.log(Person);
   var p = people.add(new Person(req.body));
   console.log(p.getName());
   res.send(p.flattify());
});


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/simpleClient.html');
});