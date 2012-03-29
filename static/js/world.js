if (typeof _ === "undefined") {
    var _ = require("./underscore");
}
var world = function () {
    var gridH = 25;
	var gridW = 25;
    var grid = [];
    var players =  [];
    var minPlayersToStart = 1;
    var maxPlayers = 4;
    
    var howManyPlayers = function() {return players.length;};
    var timerId = 0;
    var io = null;
    // last tick value
    var lastTick;
    // the update interval in ms
    var cycleSpeedMs = 1000;
    // the players speed in units per second
    var playerSpeed = 1;
    // the players move at units (direction) per second (rate).
    var playerRate = 1000;
    // the current tick spinner (a 1 second tick spinner) - used to figure out when a second is up
    var tickSpinner = 0;
    var chatLog = [];
    
    var playerDiedCallback = function() { 
        console.log("Player died");
        
    };
    
    var resetGameCallback = function() {};
    
    function getPlayerIndexById(id) {
        for (var i = 0, l = players.length; i < l; i++) {
            if(players[i].id == id)
                return i;
        }
        
        return -1;
    }
    
    function getPlayerById(id) {
        return players[getPlayerIndexById(id)];
    }
    
    function roundedPos(pos) {
        return {x: Math.round(pos.x), y: Math.round(pos.y)};
    }
    
    // TODO: Stop this from really dark colors
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    
    function getPlayerData() {
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
        player.status = "playing";
        if (getPlayerIndexById(player.id)===-1 && players.length < maxPlayers){
    	    players.push(player);
            setInitPosition(getPlayerIndexById(player.id));
            console.log(players);
        }
    };
    
    function setInitPosition(i) {
        _.extend(players[i], getInitCoordsAndDir(i));
    }
    
    var removePlayerById = function(id) {
        var pIndex = getPlayerIndexById(id);
        if (pIndex >=0)
            players.remove(pIndex);
    }
    
    function getDirObj(d){
        var dir;
        switch (d) {
              case 'w': dir = {x:-playerSpeed, y:0}; break;  
	          case 'n': dir = {x:0, y:-playerSpeed}; break;
	          case 'e': dir = {x:playerSpeed, y:0}; break;
	          case 's': dir = {x:0, y:playerSpeed}; break;
	          default: return;
	        }
        return dir;
    }
    
    var updatePlayerDirById = function(id, dirStr) {
        var pIndex = getPlayerIndexById(id);
        var dir;
        if (pIndex >=0) {
        	dir = getDirObj(dirStr);
	        //console.log(dir);
	        
            _.extend(players[pIndex], {newDir:dir});
            console.log("update player: " + JSON.stringify(players[pIndex]));
        }
    }

    var getPlayerNameById = function(id) {
        var playerIndex = getPlayerIndexById(id);
        
        if (playerIndex < 0) {
            return "";
        }
        
        return players[playerIndex].name;
    }

    var getPlayerColorById = function(id) {
        var playerIndex = getPlayerIndexById(id);
        
        if (playerIndex < 0) {
            return "";
        }
        
        return players[playerIndex].color;
    }
    
    function getInitCoordsAndDir(i){
        var x,y,dir,retObj;
        switch (i) {
            case 0:
                x = 0;
                y = 0;
                dir = "e";
                break;
            case 1:
                x = gridW - 1;
                y = 0;
                dir = "s";
                break;
            case 2:
                x=gridW - 1;
                y=gridH - 1;
                dir="w"
                break;
            case 3:
                x=0;
                y=gridH - 1;
                dir="n";
            default:
                break;
        }
        retObj =  {pos:{x:x,y:y},newDir:getDirObj(dir)};
        return retObj;
    }
    
    // initialize the world model for a new game.
    var initWorld = function() {
    	grid = new Array(gridW)

		  for (var i = 0; i < gridW; i++) {
			  grid[i]=new Array(gridH);
		  }
		
		// start players off in a direction when game starts
		//for (var i = 0; i < players.length; i++) {
		//	players[i].dir.x = playerSpeed;
		//}
    }
    function playerHitBorder(player) {
        return (player.pos.x < 0 || player.pos.x >= gridW ||
                player.pos.y < 0 || player.pos.y >= gridH);
    }
    
    // determines if player can move in the desired new direction
    function updatePlayerDirection(player) {
    	var deltaX = player.dir.x + player.newDir.x;
    	var deltaY = player.dir.y + player.newDir.y;
    	
    	// double back - invalid
    	if (deltaX == 0 && deltaY == 0) {
    		player.newDir = player.dir;
    	} else {
    		player.dir = player.newDir;
    	}
    }
    
    // update the world state
    var crank = function(tick) {
		// elapsed ticks
		var dt = tick - lastTick;
		tickSpinner += dt;
		
		// elapsed per second clock rate (how much time in seconds has elapsed since last cycle)
		//var dRate = (dt / playerRate);
		
		// update player positions if a second has elapsed
		if (tickSpinner > 1000) {
			//console.log("crank - delta: " + dt + " tick: " + tick);
			// update player positions
			for (var i = 0; i < players.length; i++) {
				
				if (!players[i] || !players[i].pos || !players[i].dir)
				    continue;

                if (players[i].status != "playing")
                    continue;
				
				// applies desired direction change if valid
				updatePlayerDirection(players[i]);
					
				// spatial float position updates (overkill currently)
				//players[i].pos.x += players[i].dir.x * dRate;
				//players[i].pos.y += players[i].dir.y * dRate;
				players[i].pos.x += players[i].dir.x;
				players[i].pos.y += players[i].dir.y;
				
				//console.log("* " + players[i].pos.x + " - " + players[i].pos.y + " - " + grid[players[i].pos.x, players[i].pos.y]);
				// collision
				//console.log(grid[players[i].pos.x][players[i].pos.y]);
				if (playerHitBorder(players[i]) || grid[players[i].pos.x][players[i].pos.y]) {
				    console.log("player " + players[i].id + 
					  " collision at (" + players[i].pos.x + "," + players[i].pos.y + ")");
				    playerDiedCallback(players[i]);
                    players[i].status = "dead";
					
				} else {
    				grid[players[i].pos.x][players[i].pos.y] = players[i].id;				    
				}

				
				//console.log("player " + players[i].id + " - (" + players[i].pos.x + "," + players[i].pos.y + ")");
			}
			
			tickSpinner %= 1000; // spin around
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
    		initWorld();
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
            io.sockets.volatile.emit('update', {"tick": tick, "playaData":getPlayerData()});
        }
        
        lastTick = tick;
    };
    
    // start the game
    var init = function() {
        if (timerId || howManyPlayers() < minPlayersToStart)
            return;
        
        initWorld();
        startCycle();
    };
    
    var resetGame =  function() {
        clearTimeout(timerId);
        timerId = 0;
        for (var i = 0; i<players.length; i++) {
          _.extend(players[i], getInitCoordsAndDir(i), {"status": "playing"});
          resetGameCallback(players[i]);
        }
        initWorld();
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
    var addChatMessage = function(msgText, playerId) {
        var player = getPlayerById(playerId),
            message = {msg: msgText, name: player.name || "Anon", color: player.color};
        
        console.log(player);
        chatLog.push(message);
        
        return message;
    };
    
    var getChatLog = function() {
        return _.clone(chatLog);
    };
    
    var updatePlayerById = function(id, obj) {
        var pIndex = getPlayerIndexById(id);
        if (pIndex >= 0)
        {
            _.extend(players[pIndex], obj);
            console.log("update player: " + JSON.stringify(players[pIndex]));
        }
    };
    
    var getGameState = function() {
        var history = new Array();
        
        for (var x = 0; x < gridW; x++) {
            for (var y = 0; y < gridH; y++) {
                if (grid[x][y]) {
                    var p = {};
                    // check return value
                    _.extend(p, getPlayerById(grid[x][y]), {"pos": {"x": x, "y": y}});
                    history.push(p);
                }
            }
        }
        
        return history;
    };
    
    var setPlayerDiedCallback = function (callback) {
        playerDiedCallback = callback;
    };
    
    var setResetGameCallback = function (callback) {
        resetGameCallback = callback;
    };
    
    return {
        addPlayer:addPlayer ,
        howManyPlayers:howManyPlayers,
        update:update,
        init:init,
        setIo: setIo,
        godSays: godSays,
        removePlayerById: removePlayerById,
        getChatLog: getChatLog,
        addChatMessage: addChatMessage,
        updatePlayerDirById: updatePlayerDirById,
        updatePlayerById: updatePlayerById,
        setPlayerDiedCallback: setPlayerDiedCallback,
        getPlayerNameById: getPlayerNameById,
        getPlayerColorById: getPlayerColorById,
        resetGame: resetGame,
        setResetGameCallback: setResetGameCallback,
        getGameState: getGameState
    };
}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = world;
    }
    exports.testingObj = world;
}