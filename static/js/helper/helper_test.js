var assert = require('assert')
  ,helper = require("./helper")
    
if (typeof module !== "undefined" && module === require.main) {
    var suiteExports = {}; 
    var suite = function(a, fun){
        fun();  
        module.exports = suiteExports;
        require("asyncjs").test.testcase(module.exports).exec()
    }
    
    var test = function(txt, testfun){
        suiteExports["test "+ txt] = testfun;
    }
    
    
}

var testArr = [
    {},
    {name:"findme"},
    {name:"findme", info: "I'm different"}
];

suite('Helper', function() {
    test('find first index of test elem with name "findme"', function() {
        assert.equal(helper.getFirstArrayElementIndexByPrpertyValue(testArr, "name", "findme"), 1);
    });
    test('find no first elem with name:"dontfindme"', function() {
        assert.equal(helper.getFirstArrayElementIndexByPrpertyValue(testArr, "name", "dontfindme"), -1);
    });
    test('find no elem with name:"dontfindme"', function() {
        assert.deepEqual(helper.getIndexesByPrpertyValue(testArr, "name", "dontfindme"), []);
    });
    test('find all elem with name:"findme"', function() {
        assert.deepEqual(helper.getIndexesByPrpertyValue(testArr, "name", "findme"), [1,2]);
    });
});

