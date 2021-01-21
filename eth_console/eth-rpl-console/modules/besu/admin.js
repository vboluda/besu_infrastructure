"use strict";

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
    
}

module.exports=bAdmin;