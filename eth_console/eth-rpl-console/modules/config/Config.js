"use strict";

const Storage = require("../lib/Storage");

class Config extends Storage {

    constructor(){
        super("config","CONFIG.DAT");
    }

    setPrompt(prompt){
        this.config.prompt=prompt;
    }

    addBesuInstance(name,rpc_url,ws_url,graphql_url){
        if(!this.config.besu){
            this.config.besu=[];
        }
        this.config.besu.push({
            name,
            rpc_url,
            ws_url,
            graphql_url,
            contracts:{}
        });
    }

    removeBesuInstance(name){
        this.config.besu.forEach((e,i,o) => {
            if(e.name===name){
                o.splice(i,1);
            }
        });
    }


}

module.exports=Config;