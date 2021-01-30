"use strict";

var dnsSync = require('dns-sync');

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

    getIp(domain){
        return dnsSync.resolve(domain);
    }

    extractIPFromUrl(url){
        var p0=url.indexOf("//");
        if(p0<0){
            p0=0;
        }else{
            p0=p0+2;
        }
        let nurl=url.substring(p0,url.length);
        var p1=nurl.indexOf(":");
        if(p1>=0){
            return nurl.substring(0,p1);
        }
        var p1=nurl.indexOf("/");
        if(p1>=0){
            return nurl.substring(0,p1);
        }
        return url.substring(0,url.length);
    }
}

module.exports=misc;