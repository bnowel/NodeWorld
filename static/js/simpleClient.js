
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function initCanvas() {
  var canvas = document.getElementById("board");
  
  return canvas.getContext("2d");
}
function drawSquare(c, pos, color) {
  if (color) {
      c.fillStyle = color;
  } else {
      c.fillStyle = "#FF0000";
  }
  c.fillRect(pos.x, pos.y, 19, 19);
  //console.log("drawSquare");
  //console.log(pos);
}

  $(function() {
    var playas = [],
      board = initCanvas();
    
    //drawSquare(board, {x: 0, y: 0});
    function worldToScreen(pos) {
    	return { x: pos.x * 20, y: pos.y * 20 };
    }
  
    function getNewPlaya(deets) {
      //console.log(deets);
      return $.extend({}, {id: 0, position: {x:0, y:0}, name: "", icon: $('<span class="icon"/>')}, deets);
    }
    function getPlaya(id) {
      for (var i = 0, l = playas.length; i < l; i++) {
        if (playas[i].id === id) {
          return playas[i];
        }
      }
    }
    function killPlaya(id) {
      for (var i = 0, l = playas.length; i < l; i++) {
        if (playas[i].id === id) {
          playas[i].icon.remove();
          playas.remove(i);
          return;
        }
      }
    }
    function updatePosition(newPos) {
      var playa = getPlaya(newPos.id);

      if (playa) {
        playa.position = newPos.position;
      }
      else {
        playa = getNewPlaya(newPos);
        //$('body').append(playa.icon);
      }

      playa.icon.css({top: playa.position.y, left: playa.position.x});
      playas.push(playa);
    }


    /*
     * Functions to handle broadcasts
     */

    var socket = io.connect('/');
    
    // playerJoined
    socket.on('playerJoined', function(data) {
      chat_console(data.name + " joined", data.color);
      $('.js-colorBlock').css("background-color", data.color);
    });
    
    // updateName
    socket.on('updateName', function(data) {
      chat_console(data.oldName + " changed name to " + data.name, data.color);
    });
    
    // move
    socket.on('move', function(data) {
      updatePosition(data);
    });

    // chat
    socket.on('chat' , function(data){ 
        $chatLog = $("#chat-log");

        //Check if we are at the bottom of the chat log
        var atBottom = $chatLog[0].scrollHeight - $chatLog.scrollTop() <= $chatLog.outerHeight(); 

        $("#chat-log").append($('<div/>').text(data.msg).prepend($('<span>').css("color",data.color).text(data.name + ": ")));

        if(atBottom) {  //if we were at the bottom of the chat log
          //scroll chat log to new bottom
          $chatLog.scrollTop($chatLog[0].scrollHeight); 
        }
    });
    
    // update positions
    socket.on('update', function(data) {
      //console.log(data.playaData[0].pos.x);
      console.log(data);
      for (var i=0, l=data.playaData.length; i < l; i++) {
        // convert world to screen
        var sp = worldToScreen(data.playaData[i].pos);
        drawSquare(board, sp, data.playaData[i].color);
      }

    });
    
    // playerDied
    socket.on('playerDied', function(data) {
      console.log("Player " + data.id + " died");
      chat_console(data.name + " died", data.color);
    });

    // kill player
    socket.on('died', function(data) {
      //console.log('Player died: ' + data.name +  JSON.stringify(data));
      killPlaya(data.id); 
    });
    
    // reset game
    socket.on('resetGame', function() {
      chat_console("game reset recieved", "#575757");
      
      //clear board
      board.clearRect(0, 0, 500, 500);
      socket.emit("rejoinGame");    
    });
  
  
    // rejoin game
    socket.on('rejoinGame', function(data) {
      chat_console(data.name + " rejoined game", data.color);
      
    });
    /* 
     * debug 
     */
     
    // playerCount
    socket.on('playerCount', function(data) {
      console.log("player Count: " + data.players);
    });
   
    /*
     * Helper functions
     */
    
    function chat_console(console_msg, color) {
     color = color || '#ddd';
     $("#chat-log").append($('<div/>').prepend($('<span>').css("color",color).text(console_msg)));
    }
    
    function bindSubmitOnEnter($txtBox, $submitButton) {
      $txtBox.keypress(function(e){
          if(e.which == 13){
               $submitButton.triggerHandler("click");
          }
      });        
    }
    
    
    /*
     * View config
     */
     
    bindSubmitOnEnter($('#name'), $('#save'));
    
    $("#save").click(function() {
      var $name = $('#name'),
        stuff = $.trim( $name.val() ),
        words = stuff.split(" ");
      
      if (stuff === "") {
        $name.css({'background-color': '#faa', 'border-color': '#944'}); 
      }
      else if (words[0] != "god") {
          socket.emit('name', { name: $name.val() });
        $("#joined #joined-name").text( $name.val() );
        $("#join").hide();
        $("#joined").show();
      }
      else {
      	socket.emit('god', {message:words[1],arg1:words[2]})
      }
    });

    $("#name").focus(function() {
      $(this).css({'background-color': '', 'border-color': ''}); 
    });
    
    $("#edit-name").click(function() {
        $("#joined").hide();
        $("#join").show().focus();
    });
    
    bindSubmitOnEnter($('#chat-msg'), $('#send-chat-msg'));
    
    $("#send-chat-msg").click(function() {
        var messageFromPlayer = $("#chat-msg").val();
        if(messageFromPlayer != "") {
          socket.emit('chat', {message: messageFromPlayer});
        }
         $("#chat-msg").val("");                   
    });
    
    $("#reset-game").click(function() {
      socket.emit('resetGame');
      chat_console("game reset sent", "#444");
    });
    
    /*
     * Game controls
     */
    
    // Only triggered once per press.  If we want to know if they are holding it down
    // we should look at keypress.
    $(window).keydown(function(e) {
      var dir;
      
      switch (e.keyCode) {
        case 37: dir = 'w'; break;
        case 38: dir = 'n'; break;
        case 39: dir = 'e'; break;
        case 40: dir = 's'; break;
        default: return;
      }
      socket.emit('dir', {'dir': dir});
    });
  });

