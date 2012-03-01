var world = function () {
    var grid = [];
    var players =  [];
    var minPlayersToStart = 4;
    var addPlayer = function(player) {players.push(player);}
    var howManyPlayers = function() {return players.length;}
    var timerId = 0;
    var update = function() { 
        // update ticks
        console.log("update ran");
        io.sockets.volatile.emit('update', {"hoo": "ray"});
    }
    var init= function() {
        if (this.timerId || howManyPlayers() < minPlayersToStart)
            return;
        
        this.timerId = setInterval(world.update, 1000);
    }
    
    return {
        addPlayer:addPlayer ,
        howManyPlayers:howManyPlayers,
        update:update,
        init:init
    }
}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = world;
    }
    exports.testingObj = world;
}