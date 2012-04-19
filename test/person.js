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
         
        assert.throws( function() { person.setColor("AABB") }, "Bad Color", "Bad Color");
        assert.throws( function() { person.setColor("#AABBC") }, "Bad Color", "Bad Color");
        assert.doesNotThrow( function() { person.setColor("#FFF") }, "Bad Color", "Bad Color");        
     });
 });