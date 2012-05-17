var Person = require('./../person/person');

var people = (function() { 
    var index = 1; 
    return {
        add : function(person) { 
            if (!(person instanceof Person)) {
                throw "Not a Person";
            }
            var id = index++; 
            person.setId(id);
            this[id.toString()] = person;
            return person;
        },
        remove: function(id) {
            return delete this[id];
        }
    }
})();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = people;
    }
}