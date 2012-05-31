var Person = require('./../person/person'),
    Player = require('./../player/player');

var Players = (function() { 
    var index = 1; 
    return {
        add : function(person) { 
            if (!(person instanceof Person)) {
                throw "Not a person";
            }
            var id = index++,
                player = new Player({refId: person.getId(), id: id});
            
            this[id.toString()] = player;
            return player;
        }/*,
        remove: function(id) {
            return delete this[id];
        }*/,
        kill : function(id){
            players[id].die();
        }
    }
})();





if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
	exports = module.exports = Players;
	}
}