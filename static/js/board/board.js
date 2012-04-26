function Board(details) {
    // Make sure we instantiate this object

    if (!(this instanceof Board)) {
        return new Board(details);
    }
    
    
    var height = 25; 
    var width = 25;
    
    var board = [];
    
    
    if (details){
        if (details.height < 1 || details.width < 1){
            throw "Bad dimension";
        }
        if (details.height && details.width){
            height = details.height;
            width = details.width;
        } else if (details.height) {
            height = width = details.height;
        } else if (details.width) {
            height = width = details.width;
        }
    }
    
    //build da board BDB
    for (var i = 0; i < width; i++){
        board[i] = new Array(height);
    }
    this.getObj = function(x,y){
        checkCoords(x,y);
        return board[x][y];
    }
    
    var checkCoords = function(x,y){
        if (x >= width || y >= height || x < 0 || y < 0){
            throw "index out of bounds";
        }
    }
    
    this.setObj = function(x,y,obj){
        checkCoords(x,y);
        if (board[x][y]){
            throw "element already set"
        }
        // maybe add type checking on obj?
        board[x][y] = obj;
    }
    
    this.getHeight = function(){
        return height;
    }
    
    this.getWidth = function(){
        return width;
    }
    
}
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Board;
    }
}