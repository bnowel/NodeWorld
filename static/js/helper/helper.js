var helper = {
    getFirstArrayElementIndexByPropertyValue : function(arrIn, prop, val){
        var i = -1,
            indexes = this.getIndexesByPropertyValue(arrIn, prop, val);
            
        if (indexes.length > 0) {
            i = indexes[0];    
        }
        
        return i;
    },
    getIndexesByPropertyValue :  function(arrIn, prop, val){
        var len = arrIn.length,
            indexes = [];
        if (len!=0){
            for (var i=0;i<len;i++){
                var el = arrIn[i];
                if (el.hasOwnProperty(prop) && el[prop] === val){
                    indexes.push(i);
                }
            }
        }
        return indexes;    
    },
    
    flattify : function (obj){
        var retobj = {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)){
                if (typeof obj[key] === "function"){
                    if (key.substring(0,3) == "get"){
                        var downCaseKey = key.substr(3).charAt(0).toLowerCase() + key.slice(4);
                        retobj[downCaseKey] = obj[key]();    
                    }
                } else {
                    retobj[key] = obj[key];
                }
            }
        }
        return retobj;
    } 
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = helper;
    }
}