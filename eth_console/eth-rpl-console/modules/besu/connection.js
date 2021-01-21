"use strict";

var request = require('sync-request');

class besu_connection{

    constructor(url){
        this.url=url;
    }

    request(method,args){
        let data={
            "jsonrpc":"2.0",
            "method":method,
            "params":args,
            "id":1
        };
        //data={"jsonrpc":"2.0","method":"admin_peers","params":[],"id":1};
        //console.log("DATA:\n"+JSON.stringify(data));
        let res=request("POST",this.url,{"json":data});
        return JSON.parse(res.getBody());
    }
}

module.exports=besu_connection;