"use strict";

const newPromise=require("./newPromise");

var handler = {
    get: function(target, name){
        if(!(name in target)){
            console.log("Wrong Property!!");
            return {}
        };
        var property=target[name];
        if(typeof property === 'function'){
            return function(){
                //console.log("CALL "+name);
                var result= property(...arguments);
                if(result instanceof Promise){
                    return new newPromise(result);
                }
                return result;
            }
        }
        if(typeof property === 'object'){
            return new Proxy(property, handler); 
        };
        return property;
    },
};

module.exports=handler;