var world = function () {
    var grid = [];
    var players =  [];
    var minPlayersToStart = 4;
    var addPlayer = function(player) {players.push(player);};
    var howManyPlayers = function() {return players.length;};
    var timerId = 0;
    var io = null;
    
    var update = function() { 
        // update ticks
        console.log("update ran");
        if (io) {
            io.sockets.volatile.emit('update', {"hoo": "ray"});
        }
    };
    var init= function() {
        if (timerId || howManyPlayers() < minPlayersToStart)
            return;
        
        timerId = setInterval(world.update, 1000);
    };
    var setIo = function(pIo) {
        io = pIo;
    };
    
    return {
        addPlayer:addPlayer ,
        howManyPlayers:howManyPlayers,
        update:update,
        init:init,
        setIo: setIo
    };
}();

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = world;
    }
    exports.testingObj = world;
}