var assert = require('assert'),
    Player = require('./../static/js/player/player');
  
 suite('Player', function() {
     test('Player Instantiation', function() {
         
         assert.throws(function() {var player = Player();}, "Player reuires a person refernce", "Player must reference a person");
         assert.doesNotThrow(function() {var player2 = Player({refId:"someRef"});}, "Player reuires a person refernce", "Player must reference a person");
         var player2 = Player({refId:"someRef"});
         assert.equal(player2.getRefId(), "someRef");
     });
     
 });