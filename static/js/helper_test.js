var assert = require('assert')
  ,helper = require("../../static/js/helper")
    
if (typeof module !== "undefined" && module === require.main) {
    var suiteExports = {}; 
    var suite = function(a, fun){
        fun();  
    }
    
    var test = function(txt, testfun){
        suiteExports["test "+ txt] = testfun;
    }
    
    
}

var testArr = [
    {},
    {name:"findme"}
];

suite('Helper', function() {
    test('find index of test elem with name "findme"', function() {
        assert.equal(helper.getArrayElementIndexByPrpertyValue(testArr, "name", "findme"), 1);
    });
    test('find no elem with name:"dontfindme"', function() {
        assert.equal(helper.getArrayElementIndexByPrpertyValue(testArr, "name", "dontfindme"), -1);
    });
});

if (typeof module !== "undefined" && module === require.main) {
    module.exports = suiteExports;
    require("asyncjs").test.testcase(module.exports).exec()
}
