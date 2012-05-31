function Player(details) {
    // Make sure we instantiate this object
    if (!(details && details["refId"])){
        throw "Player reuires a person refernce";    
    }
    
    if (!(this instanceof Player)) {
        return new Player(details);
    }
    
    
    var color,
        id,
        status,
        position,
        noDirection = {x: 0, y: 0};

    var refId;
    this.getRefId = function() {
         return refId;   
    }
    // end refId

    function getDirObj(d){
        var dir;
        switch (d) {
              case 'w': dir = {x:-1, y:0}; break;  
	          case 'n': dir = {x:0,  y:-1}; break;
	          case 'e': dir = {x:1,  y:0}; break;
	          case 's': dir = {x:0,  y:1}; break;
	          default: return;
	        }
        return dir;
    }
    
    var direction = noDirection;
    this.setDirection = function(newDir) {
        if (typeof(newDir) === "string") {
            direction = getDirObj(newDir);
        } else {
            // add some checking heeeere
            direction = newDir;
        }
    }
    
    var newDirection = noDirection;
    this.setNewDirection = function(newDir) {
        if (typeof(newDir) === "string") {
            newDirection = getDirObj(newDir);
        } else {
            newDirection = newDir;
        }
    }
    
    this.updateDirection = function() {
        var deltaX = this.direction.x + this.newDirection.x,
    	    deltaY = this.direction.y + this.newDirection.y;
    	
    	// double back - invalid
    	if (deltaX == 0 && deltaY == 0) {
    		this.newDirection = this.direction;
    	} else {
    		this.direction = this.newDirection;
    	}
    }
    

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
    