function Message(options) {
    // Make sure we instantiate this object

    if (!(this instanceof Message)) {
        return new Message(options);
    }
    
    var timestamp = new Date();
    this.getTimestamp = function() {
        return timestamp;
    }
    
    this.setTimestamp = function(newTime) {
        if (newTime) {
            timestamp = newTime;            
        }
    }
    // End timestamp
    
    var text = "";
    this.getText = function() {
        return text;
    }
    
    this.setText = function(newText) {
        text = newText;
    }
    // End text
    
    // This is taken from person.  Maybe there is some way to share this stuff
    var color = "#FFFFFF";
    this.getColor = function () {
        return color;    
    }
    
    this.setColor = function(val) {
        if (typeof val !== "undefined" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val) ) {
            color = val;
        } else if (typeof val !== "undefined") {
            throw new Exception("Bad Color");
        }
    }
    // End Color

    // This is taken from person.  Maybe there is some way to share this stuff    
    var name = "Anon";
    this.getName = function () {
        return name;    
    }
    
    this.setName = function (val) {
        if (val == "")
            throw new Exception("Name cannot be blank");
        
        name = val;    
    }
    // End Name
    
    if (options) {
        this.setTimestamp( options["timestamp"] );
        this.setText( options["text"] );
        this.setColor( options["color"] );
        if (options["name"]) {
            this.setName( options["name"] );
        }
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Message;
    }
}