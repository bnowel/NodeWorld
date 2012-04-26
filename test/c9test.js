// This file should only be included in *_test.js files for c9 auto testing
var assert = require('assert');

var suiteExports = {}; 
global.suite = function(a, fun){
    fun();  
    module.exports = suiteExports;
    console.log("Test Suite: "+a);
    console.log("*******************************");
    require("asyncjs").test.testcase(module.exports).exec()
}

 global.test = function(txt, testfun){
    suiteExports["test: " + txt] = testfun;
}    