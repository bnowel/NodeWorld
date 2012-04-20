function Player(details) {
    // Make sure we instantiate this object
    if (!(details && details["refId"])){
        throw "Player reuires a person refernce";    
    }
    
    if (!(this instanceof Player)) {
        return new Player(details);
    }
    
    
var color,
direction,
id,
status,
position;

    var refId;
    
    this.getRefId = function() {
         return refId;   
    }
    // end refId

    if (details) {
        refId = details.refId;
        
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Player;
    }
    exports.testingObj = Player;
}
    