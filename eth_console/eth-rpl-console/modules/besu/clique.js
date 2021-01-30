"use strict";

var os = require( 'os' );
const Misc=require("../utils/misc");

class bClique{
    constructor(conn){
        this.connection=conn;
    }

    discard(address){
        if(!Array.isArray(address)){
            address=[address];
        }
        return this.connection.request("clique_discard",address).result;
    }
    
    getSigners(block="latest"){
        if(!Array.isArray(block)){
            block=[block];
        }
        return this.connection.request("clique_getSigners",block).result;
    }

    getSignerMetrics(ini,end){
        if(!ini || !end) return [];
        return this.connection.request("clique_getSignerMetrics",[""+ini,""+end]).result;
    }

    propose(address,addsigner=true){
        return this.connection.request("clique_propose",[address,addsigner]).result;
    }

}

module.exports=bClique;