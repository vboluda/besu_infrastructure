"use strict";

class misc{
    constructor(){
    }

    createTx(_from,_to,_value,_gasLimit=21000,_gasPrice=1000000){
        return {
            from: _from,
            to: _to,
            value:_value,
            gasPrice: _gasPrice,
            gasLimit: _gasLimit
        }
    }

    createTxEth(_from,_to,_value,_gasLimit=21000,_gasPrice=1000000){
        return {
            from: _from,
            to: _to,
            value:_value*1000000000000000000,
            gasPrice: _gasPrice,
            gasLimit: _gasLimit
        }
    }
}

module.exports=misc;