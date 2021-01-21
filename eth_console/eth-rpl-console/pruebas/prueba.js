"use strict";

var handler = {
    get: function(target, name){
        if(!(name in target)){return 37};
        var property=target[name];
        if(typeof property === 'function'){
            return function(){
                console.log("CALL "+name);
                var result= property(...arguments);
                return result;
            }
        }
        if(typeof property === 'object'){
            return new Proxy(property, handler); 
        };
        return property;
    },
};

var obj={
    f:function(){console.log("Hola")},
    otro:{
        aa:1,
        bb:2,
        suma:function(a,b,c){
            return a+b+c;
        }
    }
};

var p = new Proxy(obj, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37
p.f(1)
console.log("OTRO "+p.otro.aa);
console.log("SUMA: "+p.otro.suma(1,2,3));