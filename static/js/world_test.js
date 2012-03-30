var assert = require('assert')
  ,world = require("../../static/js/world")
  

//    module.exports = {
//        'test World starts with no players':function() {
//            assert.equal(world.howManyPlayers(), 0);
//        },
//        'test World adding players': function() {
//           world.addPlayer({});
//           assert.equal(world.howManyPlayers(), 1);
//        },
//        'test not atomic tests': function() {
//            assert.equal(world.howManyPlayers(), 1);
//        }
//     
//    };
    
if (typeof module !== "undefined" && module === require.main) {
    var suiteExports = {}; 
    var suite = function(a, fun){
        fun();  
    }
    
    var test = function(txt, testfun){
        suiteExports["test "+ txt] = testfun;
    }
    
    
}

suite('World', function() {
    test('World starts with no players', function() {
        assert.equal(world.howManyPlayers(), 0);
    });
    test('World adding players', function() {
       world.addPlayer({}); 
       assert.equal(world.howManyPlayers(), 1);
    });
    test('not atomic tests', function() {
        assert.equal(world.howManyPlayers(), 1);
    });
});

if (typeof module !== "undefined" && module === require.main) {
    module.exports = suiteExports;
    require("asyncjs").test.testcase(module.exports).exec()
}

