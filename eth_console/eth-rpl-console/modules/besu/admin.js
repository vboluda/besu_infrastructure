"use strict";

var os = require( 'os' );
const Misc=require("../utils/misc");

class bAdmin{
    constructor(conn){
        this.connection=conn;
    }

    peers(){
        return this.connection.request("admin_peers",[]).result;
    }

    addPeers(peers){
        if(!Array.isArray(peers)){
            peers=[peers];
        }
        return this.connection.request("admin_addPeer",peers).result;
    }

    nodeInfo(){
        return this.connection.request("admin_nodeInfo",[]).result;
    }

    getEnode(){
        let enode_raw=this.nodeInfo().enode;
        let result=[];
        var misc=new Misc();
        var url=this.connection.url;
        //console.log("URL: "+url);
        var currentDomain=misc.extractIPFromUrl(url);
        //console.log("Current Domain: "+currentDomain);
        var currentIp=misc.getIp(currentDomain);
        //console.log("Current IP: "+currentIp);
        let enode=enode_raw.replace("127.0.0.1",currentIp);
        //console.log("Enode: "+enode);
        return enode;
    }
    
}

module.exports=bAdmin;