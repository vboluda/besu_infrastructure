"use strict";

const dns=require("dns")

function* contador(n){
    for(var i=n;true;i++){
        var r=yield i;
        if(r){
            i=n-1;
        }
    }
}

function run(generatorFunction) {
    console.log("RUN - ENTER");
    var generatorItr = generatorFunction(resume);
    function resume() {
        console.log("RESUME "+JSON.stringify(arguments));
        generatorItr.next(arguments);
    }
    console.log("RUN - NEXT");
    generatorItr.next()
}


// var tcontador=contador(100);

// console.log(tcontador.next().value);
// console.log(tcontador.next().value);
// console.log(tcontador.next().value);
// console.log(tcontador.next(true).value);
// console.log(tcontador.next().value);

// run( function* myDelayedMessages(resume) {
//     console.log("DELAY 1");
//     console.log(yield setTimeout(resume, 1000, 'dummy'));
//     console.log("DELAY 2");
//     console.log(yield setTimeout(resume, 1000, 'Dummy'));
// })
var domain="google.com";
var resultado;
var res=run(function* fdns(resume){
    resultado=yield dns.lookup(domain,(e,a,f)=>{
        resume(e,a,f);
    });
    return resultado[1];
});

console.log("Resultado "+res);

