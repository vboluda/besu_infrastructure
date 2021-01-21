"use strict";

class beth{
    constructor(_connection,_wallet){
        this.connection=_connection;
        this.wallet=_wallet;
        this.nounces={};
        process.stdout.write("Retrieve account info from node server\r");
        for(let i=0,sz=this.wallet.address.length;i<sz;i++){
            let res = this.connection.request("eth_getTransactionCount",[this.wallet.address[i],'latest']);
            //console.log(`[${i}]: ${this.wallet.address[i]} - ${res.result}`);
            this.nounces[this.wallet.address[i]]=res.result;
        }
        console.info("Retrieve account info from node server: DONE");
    }

    blockNumber(){
        let res = this.connection.request("eth_blockNumber",[]);
        let block = parseInt(res.result);
        return block;
    }

    sendRawTransaction(tx){
        if(!Array.isArray(tx)){
            tx=[tx];
        }
        return this.connection.request("eth_sendRawTransaction",tx).result;
    }

    getBalance(address){
        if(!Array.isArray(address)){
            address=[address,'latest'];
        }
        return parseInt(this.connection.request("eth_getBalance",address).result);
    }

    getTransactionByHash(tx){
        if(!Array.isArray(tx)){
            tx=[tx];
        }
        return this.connection.request("eth_getTransactionByHash",tx).result;
    }

    getTransactionCount(from){
        return this.nounces[from]++;
    }

    sendTransaction(tx){
        tx.nonce=this.getTransactionCount(tx.from);
        let signedTx=this.wallet.signTransaction(tx);
        //console.log(JSON.stringify(tx));
        return this.sendRawTransaction(signedTx);
    }
    
    checkBalances(){
        var total=0;
        for(let i=0,sz=this.wallet.address.length;i<sz;i++){
            var balance=this.getBalance(this.wallet.address[i]);
            console.log(`  Account [${i}] "${this.wallet.address[i]}" ${balance} wei \t(${balance/1000000000000000000} ether)`);
            total+=balance;
        }
        console.log(`TOTAL ${total} wei (${total/1000000000000000000} ether)`);
    }
}

module.exports=beth;