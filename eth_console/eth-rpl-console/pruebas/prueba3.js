"use strict";

const dns=require("dns")

function getIp(domain){
    return new Promise((resolve,reject)=>{
        dns.lookup(domain,(e,a,f)=>{
            if(e){
                reject(e)
            }else{
                resolve(a);
            }
        });
    })
}

function execYield(func){
    console.log("execYield3");
    var fiter=func(cb);
    function cb(e,a,f){
        console.log("Cb");
        fiter.next(a);
    }
    fiter.next();
}



function* yieldGetIp(){
    console.log("Entrada yieldGetIp");
    var r=yield dns.lookup(domainname,(e,a,f)=>{
        console.log("Dentro de lookup "+a);
        yieldGetIp.next(a);
    });
    console.log("Valor: "+r);
    return r;
}



function extractIPFromUrl(url){
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
execYield(function* dnsf(r){
        console.log("execYield");
        yield dns.lookup(domain,cb);
        console.log("execYield2");
    })
    
    //console.log("IP: "+extractIPFromUrl("http://127.0.0.1:8545"));


