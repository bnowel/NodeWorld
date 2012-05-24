function Engine(details) {
    // Make sure we instantiate this object

    if (!(this instanceof Engine)) {
        return new Engine(details);
    }
    
    this.update = function(){};
    
    this.setUpdateCallback = function(callback) {
        if (typeof(callback) === "function") {
            this.update = callback;
        }
    }

    var cycleSpeedMs = 250;    
    this.setCycleSpeedMs = function(value) {
        cycleSpeedMs = value;
    }
    
    this.getCycleSpeedMs = function() {
        return cycleSpeedMs;
    }
    
    var lastTick = 0,
        tickSpinner = 0;
    
    this.crank = function(tick) {
        // elapsed ticks
		var dt = tick - lastTick;
		lastTick = tick;
		tickSpinner += dt;
		
        //console.log("Spinner " + tickSpinner + " " + new Date());
		// elapsed per second clock rate (how much time in seconds has elapsed since last cycle)
		//var dRate = (dt / playerRate);
		
		// update player positions if a second has elapsed
		if (tickSpinner >= cycleSpeedMs) {
            this.update();
        }
        
		tickSpinner %= cycleSpeedMs; // spin around
    }
    
    if (details) {
        this.setUpdateCallback(details["updateCallback"]);
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Engine;
    }
}