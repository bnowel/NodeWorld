var assert = require('assert'),
    Engine = require('./../static/js/engine/engine');
  
suite('Engine', function() {
    test('Engine Instantiation', function() {
        var engine = Engine();
        assert.ok(engine instanceof Engine, "Make new object even if not called with new.");
    });
    
    test('Set Update From Initializer', function() {
        var msg = "hai",
            engine = new Engine({updateCallback: function(){ return msg; }});
       
        assert.equal(msg, engine.update(), "callback working");
    });
    
    test('Set Update Function', function() {
        var msg = "hai",
            engine = new Engine();
            
        engine.setUpdateCallback(function() { return msg });
        
        assert.equal(msg, engine.update(), "callback working");
    });
    
    test('Cycle Speed', function() {
        var defaultCycleSpeed = 250,
            newCycleSpeed = 500,
            engine = new Engine();
        
        assert.equal(defaultCycleSpeed, engine.getCycleSpeedMs());
        
        engine.setCycleSpeedMs(newCycleSpeed);
        assert.equal(newCycleSpeed, engine.getCycleSpeedMs());
    })
    
    test('Crank it', function() {
        var counter = 0,
            engine = new Engine({updateCallback: function(){ return ++counter; }}),
            cycleSpeed = engine.getCycleSpeedMs(),
            tick = cycleSpeed;

        assert.equal(0, counter, "don't crank");        
        engine.crank(tick);
        assert.equal(1, counter, "crank it once");
        
        tick = cycleSpeed * 2;
        engine.crank(tick);
        assert.equal(2, counter, "crank it twice");
        
        tick = cycleSpeed * 4;
        engine.crank(tick);
        assert.equal(3, counter, "crank it way out");
        
        tick += cycleSpeed/2;
        engine.crank(tick);
        assert.equal(3, counter, "don't crank");
        
        tick += cycleSpeed/2;
        engine.crank(tick);
        assert.equal(4, counter, "crank again");
    });
    
 });