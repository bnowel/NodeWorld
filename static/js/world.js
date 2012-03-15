if (typeof _ === "undefined") {
    var _ = require("./underscore");
}
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
    // the players speed in units per second
    var playerSpeed = 20;
    // the players move at units (direction) per second (rate).
    var playerRate = 1000;
    
    function getPlayerIndexById(id) {
        for (var i = 0, l = players.length; i < l; i++) {
            if(players[i].id == id)
                return i;
        }
        
        return -1;
    }
    
    function roundedPos(pos) {
        return {x: Math.round(pos.x), y: Math.round(pos.y)};
    }
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    
    function getPlayerPositions() {
        var playas = [];
        for (var i = 0, p; p = players[i++];) {
                var playaObj = {};
                _.extend(playaObj, p, {pos:roundedPos(p.pos)});
                playas.push(playaObj);
        }
        return playas;
    }
    
    // add a player to the world
    var addPlayer = function(player) {
    	console.log("add player: " + JSON.stringify(player));
        player.color = getRandomColor();
        if (getPlayerIndexById(player.id)===-1){
    	    players.push(player);
        }
    };
    
    var removePlayerById = function(id) {
        var pIndex = getPlayerIndexById(id);
        if (pIndex >=0)
            players.remove(pIndex);
    }
    
    var updatePlayerById = function(id, dirStr) {
        var pIndex = getPlayerIndexById(id);
        var dir;
        if (pIndex >=0) {
        	switch (dirStr) {
	          case 'w': dir = {x:-playerSpeed, y:0}; break;  
	          case 'n': dir = {x:0, y:-playerSpeed}; break;
	          case 'e': dir = {x:playerSpeed, y:0}; break;
	          case 's': dir = {x:0, y:playerSpeed}; break;
	          default: return;
	        }
	        //console.log(dir);
	        
            _.extend(players[pIndex], {dir:dir});
            console.log("update player: " + JSON.stringify(players[pIndex]));
        }
    }
    
    // update the world state
    var crank = function(tick) {
    	// elapsed ticks
    	var dt = tick - lastTick;
    	// elapsed per second clock rate (how much time in seconds has elapsed since last cycle)
    	var dRate = (dt / playerRate);
        
        console.log("crank - delta: " + dt + " tick: " + tick);
        for (var i = 0; i < players.length; i++) {
        	players[i].pos.x += players[i].dir.x * dRate;
        	players[i].pos.y += players[i].dir.y * dRate;
        	
        	console.log("player " + players[i].id + " - (" + players[i].pos.x + "," + players[i].pos.y + ")");
        }
    };
    
    function addDummyPlayers(){
    	addPlayer({id:"leo", pos:{x:10, py:10}, dir:{x:10, y:2}});
		addPlayer({id:"mike", pos:{x:10, py:10}, dir:{x:10, y:2}});
		addPlayer({id:"ralph", pos:{x:10, py:10}, dir:{x:10, y:2}});
		addPlayer({id:"don", pos:{x:10, py:10}, dir:{x:10, y:2}});
    }
    
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
    		addDummyPlayers();
    	}
    };
    
    // synchronous cycle update
    var update = function() { 
        // tick tock
        var tick = (new Date()).getTime();
        
        crank(tick);
        
        // broadcast world state
        if (io) {
            io.sockets.volatile.emit('update', {"tick": tick, "playaData":getPlayerPositions()});
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
        godSays: godSays,
        removePlayerById: removePlayerById,
        updatePlayerById: updatePlayerById
    };
}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = world;
    }
    exports.testingObj = world;
}