"use strict";

const newPromise=require("./newPromise");

class ContractAdaptor{
    constructor(_wallet,_web3,_abi,_address,_opts={}){
        this.wallet=_wallet;
        this.address=_address;
        this._abi=_abi;
        this.web3=_web3;
        this.instance=new _web3.eth.Contract(_abi,_address,_opts);
        //this.instance.options.from=_opts.from;
        //this.instance.options.gasLimit=_opts.gasLimit || 1000000;
        //this.instance.options.gasPrice=_opts.gasPrice || 1000000000;
        this.opts=_opts;
        
        this.methods={};
        for(let k in this._abi){
            let v=this._abi[k];
            if(v.type!="function") continue;
            var name=v.name;
            var def={};
            if((v.stateMutability==="view") || (v.stateMutability==="pure")){
                def.type="read";
                var _this=this;
                this.methods[name]=function(){
                    let e = (new Error().stack.split("at ")[1]).trim();
                    //console.log(e);
                    let _function1=e.split("[as ")[1];
                    let _function2=_function1.split("]")[0];
                    console.log(`CALL ${_function2}(${arguments})`);
                    var result=_this.instance.methods[_function2](...arguments).call();
                    if(result instanceof Promise){
                        return new newPromise(result);
                    }
                }
            }else{
                def.type="write";
                var _this=this;
                this.methods[name]=async function(){
                    let e = (new Error().stack.split("at ")[1]).trim();
                    //console.log(e);
                    let _function1=e.split("[as ")[1];
                    let _function2=_function1.split("]")[0];
                    //console.log(`CALL ${_function2}(${JSON.stringify(arguments)}) opts: ${JSON.stringify(this.opts)}`);
                    var code=_this.instance.methods[_function2](...arguments).encodeABI();
                    let resultFunc=function(res){return result};
                    // _this.web3.eth.getTransactionCount(_this.opts.from,"pending").then(
                    //     (r) => {
                    //         var tx={
                    //             from:_this.opts.from,
                    //             data:code,
                    //             nonce:r,
                    //             to:_this.address,
                    //             gasLimit:_this.opts.gasLimit || 1000000,
                    //             gasPrice:_this.opts.gasPrice || 1000000000,
                    //         }
                    //         var signedTx=_this.wallet.signTransaction(tx);
                    //         var result=_this.web3.eth.sendSignedTransaction(signedTx);
                    //         if(result instanceof Promise){
                    //             return new newPromise(result);
                    //         }else{
                    //             return result;
                    //         }
                    //     },
                    //     (e) => {
                    //         console.error(e);
                    //     }
                    // )
                    var _nonce=await _this.web3.eth.getTransactionCount(_this.opts.from,"pending");
                    var tx={
                        from:_this.opts.from,
                        data:code,
                        nonce:_nonce,
                        to:_this.address,
                        gasLimit:_this.opts.gasLimit || 1000000,
                        gasPrice:_this.opts.gasPrice || 1000000000,
                    }
                    var signedTx=_this.wallet.signTransaction(tx);
                    var result=_this.web3.eth.sendSignedTransaction(signedTx);
                    return result;
                }
            }

        }
      
    }



}


module.exports=ContractAdaptor;