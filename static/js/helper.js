var helper = {
    getArrayElementIndexByPrpertyValue : function(arrIn, prop, val){
        var i = -1,
            len = arrIn.length;
        if (len!=0){
            for (i=0;i<len;i++){
                var el = arrIn[i];
                if (el.hasOwnProperty(prop) && el[prop] === val){
                    return i;
                }
            }
            if (i === len){
                return -1;    
            }
        }
        return i;    
    }    
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = helper;
    }
}