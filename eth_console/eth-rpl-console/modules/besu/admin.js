"use strict";

var os = require( 'os' );
var nets = os.networkInterfaces();

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

    getEnodes(){
        let enode_raw=this.nodeInfo().enode;
        let result=[];
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    console.log("FOUND IP "+net.address);
                    result.push(enode_raw.replace('127.0.0.1',net.address))
                }
            }
        }
        return result;
    }
    
}

module.exports=bAdmin;