//  file path: root/static/person/person.js
var _ = require("../utils/underscore");

function Person(details) {
    // Make sure we instantiate this object
    if (!(this instanceof Person)) {
    	return new Person(details);
    }
    
    var id;
    this.getId = function () {
        return id;    
    }
    
    this.setId = function (val) {
        if (val == "")
            throw "Id cannot be blank";
        
        id = val;    
    }
    // End Id
    
    var name;
    this.getName = function () {
        return name;    
    }
    
    this.setName = function (val) {
        if (val == "")
            throw "Name cannot be blank";
        
        name = val;    
    }
    // End Name
    
    var color = "#FFFFFF";
    this.getColor = function () {
        return color;    
    }
    
    this.setColor = function(val) {
        if (typeof val !== "undefined" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val) ) {
            color = val;
        } else if (typeof val !== "undefined") {
            throw "Bad Color";
        }
    }
    // End Color
    
    var score = 0;
    this.getScore = function() {
        return score;
    }
    
    this.incrementScore = function(inc) {
        
        if (typeof inc === "number") {
            score += inc;            
        } else if (typeof inc === "undefined") {
            score++;
        } else {
            throw "Bad Score";
        }

    }
    // End Score
    
    // Make it flat
    this.flattify = function() {
        return { id: id, name: name, color: color }    
    }
    
    // Check to see if we got this passed
    if (details) {
        this.setId( details["id"] );
        this.setName( details["name"] );
        this.setColor( details["color"] );
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Person;
    }
}