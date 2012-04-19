if (typeof module !== "undefined" && require.main["filename"].indexOf("_mocha")<0) {
    var suiteExports = {}; 
    global.suite = function(a, fun){
        fun();  
        module.exports = suiteExports;
        require("asyncjs").test.testcase(module.exports).exec()
    }
    
     global.test = function(txt, testfun){
        suiteExports["test: " + txt] = testfun;
    }    
}