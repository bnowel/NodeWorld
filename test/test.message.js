var assert = require('assert'),
    Message = require('./../static/js/message/message');
  
suite('Message', function() {
    test('Message Instantiation', function() {
        var msg = Message();
        assert.ok(msg instanceof Message, "Make new object even if not called with new.");
    });
    
    test('Timestamp', function() {
        // Test that time is set to something even if not instantiated
        var msg = new Message();
        assert.ok(msg.getTimestamp() instanceof Date, "Messages have a default time.");

        var testDate = new Date();        
        msg = new Message({timestamp: testDate});        
        assert.equal(testDate, msg.getTimestamp(), "Date can be set with constructor");
        
        msg = new Message({unused: 10});
        assert.ok(msg.getTimestamp() instanceof Date, "Time is set correctly if not set when other details are");
        
    });
    test('Text', function() {
        var msg = new Message();
        assert.equal(msg.getText(), "", "Unset text is an empty string");
        
        var msgText = "hello";
        msg = new Message();
        msg.setText(msgText);
        assert.equal(msg.getText(), msgText, "Text can be set");
        
        msg = new Message({text: msgText});
        assert.equal(msg.getText(), msgText, "Text can be set in the constructor");
    });
    test('Instantiate with color', function() {
        var msg = new Message( {color: "#AABBCC"} );
        assert.equal(msg.getColor(), "#AABBCC", "Color set correctly");
        
        assert.throws( function() { msg.setColor("WhateverIwant") }, "Bad Color", "Bad Color");
        assert.throws( function() { msg.setColor(" ") }, "Bad Color", "Bad Color");
        assert.throws( function() { msg.setColor("") }, "Bad Color", "Bad Color");
        
       assert.throws( function() { msg.setColor("AABBCC") }, "Bad Color", "No hash tag");
       assert.throws( function() { msg.setColor("#AABBC") }, "Bad Color", "Color too short 5");
       assert.throws( function() { msg.setColor("#AABBCCE") }, "Bad Color", "Color too long 7");
       assert.doesNotThrow( function() { msg.setColor("#FFF") }, "Bad Color", "Good 3 digit color");        
    });
    test('Instantiate with name', function() {
       var msg = new Message( {name: "Brett"} );
       assert.equal(msg.getName(), "Brett", "Name is set correctly");
       
       assert.throws( function() { msg.setName("") }, "Name cannot be blank", "Name cannot be blank"); 
    });
});