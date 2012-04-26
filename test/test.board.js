var assert = require('assert'),
    Board = require('./../static/js/board/board');
  
 suite('Board', function() {
     test('Board Instantiation', function() {
         var board = Board();
         assert.ok(board instanceof Board, "Make new object even if not called with new.");
         
     });
     test('Get default board dimensions', function() {
        var board = new Board();
        assert.equal(board.getHeight(), 25, "Check default board height");
        assert.equal(board.getWidth(), 25, "Check default board width");
     });
     test('Board instaniation with details', function(){
         assert.throws(function(){ var boardH = new Board({height:-10})},"Bad dimension", 'Cant pass a negative height');
         assert.throws(function(){ var boardW = new Board({width:-10})},"Bad dimension", 'Cant pass a negative width');
         var boardH = new Board({height:10});
         assert.equal(boardH.getHeight(), 10, "height is set properly");
         assert.equal(boardH.getWidth(), 10, "width is set to height value");
         var boardW = new Board({width:11});
         assert.equal(boardW.getWidth(), 11, "width is set properly");
         assert.equal(boardW.getHeight(), 11, "height is set to width value");
         var boardHW = new Board({height:13, width:14});
         assert.equal(boardHW.getHeight(),13, "height set properly");
         assert.equal(boardHW.getWidth(), 14, "width set properly");
      });
      //test board stuff
      
      //unset element returns undef
      test('Empty board', function(){
          var board = new Board({height:10});
          assert.equal(board.getObj(0,0), undefined, "elements are undefined");
          assert.equal(board.getObj(1,7), undefined, "elements are undefined");
          assert.equal(board.getObj(9,6), undefined, "elements are undefined");
          assert.throws(function(){board.getObj(-5,6)}, "index out of bounds", "no negative coords");
          assert.throws(function(){ board.getObj(10,10) }, "index out of bounds", "only return in bounds elements");
      });
      
      test('Set elements on board', function(){
          var board = new Board({height:10});
          var test3 = {test:3};
          assert.throws(function(){board.setObj(11,11,{test:4})},"index out of bounds", "Can't set out of bounds");            
          assert.throws(function(){board.setObj(-11,-11,{test:4})},"index out of bounds", "Can't set out of bounds(negative)");
          board.setObj(4,5,test3);
          assert.equal(board.getObj(4,5),test3,"element set properly");
          assert.throws(function(){board.setObj(4,5,{othertest:5})}, "element already set", "cant overwrite elements");
          assert.equal(board.getObj(4,5),test3,"element unchanged");
      
      });
      
      
      
});