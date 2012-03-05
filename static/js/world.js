var world = function () {
    var grid = [];
    var players =  [];
    var minPlayersToStart = 4;
    
    var howManyPlayers = function() {return players.length;};
    var timerId = 0;
    var io = null;
    var lastTick;
    // the update interval in ms
    var cycleSpeedMs = 1000;
    // the players move at units (direction) per second (rate).
    var playerRate = 1000;
    
    // add a player to the world
    var addPlayer = function(player) {
    	console.log("add player: " + player.name);
    	players.push(player);
    };
    
    // update the world state
    var crank = function(tick) {
    	// elapsed ticks
    	var dt = tick - lastTick;
    	// elapsed per second clock rate (how much time in seconds has elapsed since last cycle)
    	var dRate = (dt / playerRate);
        
        console.log("crank - delta: " + dt + " tick: " + tick);
        for (var i = 0; i < players.length; i++) {
        	players[i].px += players[i].dx * dRate;
        	players[i].py += players[i].dy * dRate;
        	
        	console.log("player " + players[i].name + " - (" + players[i].px + "," + players[i].py + ")");
        }
    };
    
    // debug
    var godSays = function(data) {
    	if (data.message == "startCycle") {
    		console.log("force cycle start");
    		startCycle();
    	}
    	else if (data.message == "setCycle") {
    		console.log("set cycle speed");
    		setCycleSpeed(data.arg1);
    	}
    	else if (data.message == "dummyPlayers") {
    		addPlayer({name:"leo", px:10, py:10, dx:10, dy:2});
    		addPlayer({name:"mike", px:300, py:10, dx:10, dy:2});
    		addPlayer({name:"ralph", px:10, py:400, dx:2, dy:-1});
    		addPlayer({name:"don", px:500, py:500, dx:-2, dy:-2});
    	}
    };
    
    // synchronous cycle update
    var update = function() { 
        // tick tock
        var tick = (new Date()).getTime();
        
        crank(tick);
        
        // broadcast world state
        if (io) {
            io.sockets.volatile.emit('update', {"tick": tick});
        }
        
        lastTick = tick;
    };
    var init = function() {
        if (timerId || howManyPlayers() < minPlayersToStart)
            return;
        
        startCycle();
    };
    var startCycle = function() {
    	lastTick = (new Date()).getTime();
    	timerId = setInterval(world.update, cycleSpeedMs);
    };
    var setIo = function(pIo) {
        io = pIo;
    };
    var setCycleSpeed = function(ms) {
    	clearInterval(timerId);
    	cycleSpeedMs = ms;
    	startCycle();
    }
    
    
    return {
        addPlayer:addPlayer ,
        howManyPlayers:howManyPlayers,
        update:update,
        init:init,
        setIo: setIo,
        godSays: godSays
    };
}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = world;
    }
    exports.testingObj = world;
}