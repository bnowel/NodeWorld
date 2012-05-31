//console.log(process.argv);


var myArgs = process.argv.slice(2);

var thing = myArgs[0].toLowerCase();
var Thing = thing.substr(0,1).toUpperCase() + thing.slice(1);

console.log(thing + " " + Thing);

var fs = require('fs');

var fileString = "var "+Thing+" = {}\n\n\n\n\n\nif (typeof exports !== 'undefined') {\n\tif (typeof module !== 'undefined' && module.exports) {\n\texports = module.exports = "+Thing+";\n\t}\n}";

var c9TestFileString = "require('../../../test/c9test');\nrequire('../../../test/test."+ thing +"');";

var testFileString = "var assert = require('assert'),\n"+Thing+" = require('./../static/js/"+ thing +"/"+ thing +"');\n\nsuite('"+Thing+"', function() {\n\ttest('"+Thing+" Instantiation', function() {\n\t});\n});";

//console.log(fileString);

fs.mkdirSync('static/js/'+thing);

fs.writeFileSync('static/js/'+thing+'/'+thing+'.js', fileString);
fs.writeFileSync('static/js/'+thing+'/'+thing+'_test.js', c9TestFileString);
fs.writeFileSync('test/test.'+thing+'.js', testFileString);
