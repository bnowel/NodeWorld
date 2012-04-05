var assert = require('assert')
  ,world = require("./world")
    
if (typeof module !== "undefined" && module === require.main) {
    var suiteExports = {}; 
    var suite = function(a, fun){
        fun();  
        module.exports = suiteExports;
        require("asyncjs").test.testcase(module.exports).exec()
    }
    
    var test = function(txt, testfun){
        suiteExports["test: " + txt] = testfun;
    }    
}

suite('World', function() {
    test('World starts with no players', function() {
        assert.equal(world.howManyPlayers(), 0);
    });
    test('World adding players', function() {
       world.addPlayer({id:"fakelongIDvalue1234"}); 
       assert.equal(world.howManyPlayers(), 1);
    });
    test('not atomic tests', function() {
        assert.equal(world.howManyPlayers(), 1);
    });
    test('get position test', function() {
        world.playerSpeed = 1;
        var dir = {x:world.playerSpeed, y:0};
        assert.deepEqual(world.getInitCoordsAndDir(0), {pos:{x:0,y:0},newDir:dir,dir:dir});
    });
});
