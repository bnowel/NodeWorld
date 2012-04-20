var assert = require('assert'),
    Person = require('./../static/js/person/person');
  
 suite('Person', function() {
     test('Person Instantiation', function() {
         var person = Person();
         assert.ok(person instanceof Person, "Make new object even if not called with new.");
         
         var person2 = new Person();
         assert.ok(person2 instanceof Person, "Make new object like we're supposed to.");
     });
     
     test('Instantiate with id', function() {
        var person = new Person( {id: "1"} );
        assert.equal(person.getId(), "1", "Id is set correctly");
        
        assert.throws( function() { person.setId("") }, "Id cannot be blank", "Id cannot be blank"); 
     });
     
     test('Instantiate with name', function() {
        var person = new Person( {name: "Brett"} );
        assert.equal(person.getName(), "Brett", "Name is set correctly");
        
        assert.throws( function() { person.setName("") }, "Name cannot be blank", "Name cannot be blank"); 
     });
     
     test('Instantiate with color', function() {
         var person = new Person( {color: "#AABBCC"} );
         assert.equal(person.getColor(), "#AABBCC", "Color set correctly");
         
         assert.throws( function() { person.setColor("WhateverIwant") }, "Bad Color", "Bad Color");
         assert.throws( function() { person.setColor(" ") }, "Bad Color", "Bad Color");
         assert.throws( function() { person.setColor("") }, "Bad Color", "Bad Color");
         
        assert.throws( function() { person.setColor("AABBCC") }, "Bad Color", "No hash tag");
        assert.throws( function() { person.setColor("#AABBC") }, "Bad Color", "Color too short 5");
        assert.throws( function() { person.setColor("#AABBCCE") }, "Bad Color", "Color too long 7");
        assert.doesNotThrow( function() { person.setColor("#FFF") }, "Bad Color", "Good 3 digit color");        
     });
     
     test('Update scores', function() {
         var person = new Person( );
         
         assert.equal(person.getScore(), 0, "No score when you start.");
         person.incrementScore();
         assert.equal(person.getScore(), 1, "Increment with no parameters is a +1");
         
         person = new Person( );
         person.incrementScore(5);
         assert.equal(person.getScore(), 5, "Increment positive");

         person = new Person( );         
         person.incrementScore(-5);
         assert.equal(person.getScore(), -5, "Increment negative");
         
         person = new Person( );
         assert.throws( function() { person.incrementScore("BAM") }, "Bad Score", "Bad Score");
     });
     
     test('Instantiate person with lots of details', function() {
         var person = new Person( {id: "1", name: "Joe", color: "#FAFAFA"});
         assert.equal(person.getId(), "1", "Id");
         assert.equal(person.getName(), "Joe", "Name");
         assert.equal(person.getColor(), "#FAFAFA", "Color");
         assert.equal(person.getScore(), 0, "Score");
     });
 });