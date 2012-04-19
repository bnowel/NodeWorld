//  file path: root/static/person/person.js
var _ = require("../utils/underscore");

function Person(details) {
    // Make sure we instantiate this object
    if (!(this instanceof Person)) {
    	return new Person(details);
    }
    
    var color, score;
    

    var id;
    this.getId = function () {
        return id;    
    }
    
    this.setId = function (val) {
        if (val == "")
            throw new Exception("Id cannot be blank");
        
        id = val;    
    }
    // End Id
    
    var name;
    this.getName = function () {
        return name;    
    }
    
    this.setName = function (val) {
        if (val == "")
            throw new Exception("Name cannot be blank");
        
        name = val;    
    }
    // End Name
    
    
    // Check to see if we got this passed
    if (details) {
        this.setId(details["id"]);
        this.setName(details["name"]);
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Person;
    }
    exports.testingObj = Person;
}