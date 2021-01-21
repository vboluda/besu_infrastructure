"use strict";

class newPromise{
    constructor(_promise){
        this.promise=_promise;
    }

    print=function(){
        this.promise.then((v)=>{
            console.log("\n"+JSON.stringify(v)+"\n");
        },
        (e)=>{
            console.error(e);
        })
    }

    store=function(x){
        this.promise.then((v)=>{
            console.log("Valor: "+(typeof v));
            switch(typeof v){
                case "object": Object.assign(x, v); break;
                default: Object.assign(x,{"result":v});break;
            } 
        },
        (e)=>{
            console.error(e);
        })
    }

    then=function(resolve,reject){
        this.promise.then(resolve,reject);
    }
}

module.exports=newPromise;