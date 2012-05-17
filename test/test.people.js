var assert = require('assert'),
    helper = require('./../static/js/helper/helper'),
    _ = require('./../static/js/utils/underscore'),
    Person = require('./../static/js/person/person'),
    people = require('./../static/js/people/people');
  
 suite('people', function() {
     test('Add something other than a Person', function() {
         assert.throws(function() {people.add(1)}, "Not a person", "People can only contain person objects");
         
         // Even though this looks like a person object it wasn't instantiated as a Person
         var p = {name: 'Guy', color: '#fff'};
         assert.throws(function() {people.add(p)}, "Not a person", "People can only contain person objects");
     });
     
     test('Add and Get a Person', function() {
         var p = new Person({name: 'Guy', color: '#fff'});

         var addedP = people.add(p);
         
         assert.deepEqual(p, addedP, "We added to people");
     });
 });