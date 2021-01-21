"use strict";

class btest{
    constructor(_eth,_txPool){
        this.eth=_eth;
        this.txPool=_txPool
    }

    testScript(fromAddress,toAddress,num,step,gasPrice=1000){
        var initialBlock=this.eth.blockNumber();
        var initial=Date.now();
        var maxPending=0;
        var totalPending=0;
        console.log("**** SCRIPT FOR TEST BLOCKCHAIN");
        console.log("FROM ACCOUNT: "+fromAddress);
        console.log("TO ACCOUNT: "+toAddress);
        console.log("TX;PENDING;SECS;THROWPUT;TX PENDING;MAX TX PENDING");
        for(var i=1;i<(num+1);i++){
            var tx={
                from:fromAddress, 
                to: toAddress,
                gasPrice: gasPrice,
                gasLimit: 21000, 
                value: 1
            }
            this.eth.sendTransaction(tx) //Send 1 wei
            if((i % step)==0){
                    var currTime=(Date.now()-initial)/1000;
                    var stats=this.txPool.besuStatistics();
                    var pending=stats.localCount+stats.remoteCount;
                    if((pending/currTime)>maxPending){
                            maxPending=(pending/currTime);
                    }
                    var currPending= (pending/currTime);
                    //console.log("TX NUMBER: "+i+" "+pending+" secs: "+currTime+" thowput: "+(i/currTime)+ "tx/s MAX TX Pending "+maxPending);
                    console.log(""+i+";"+pending+";"+currTime+";"+(i/currTime)+";"+currPending+";"+maxPending);
            }
        }
    }
}

module.exports=btest;