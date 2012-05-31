var assert = require('assert'),
Players = require('./../static/js/players/players'),
Player = require('./../static/js/player/player'),
Person = require('./../static/js/person/person');

suite('Players', function() {
	test('Players Instantiation', function() {
	    var person = new Person( {name: "imaPerson"} );
	    person.setId("11");
	    var player = Players.add(person);
	    
	    assert.equal("11", player.getRefId());
	});
});