"use strict";

class btxpool{
    constructor(conn){
        this.connection=conn;
    }

    besuStatistics(){
        let res = this.connection.request("txpool_besuStatistics",[]);
        return res.result;
    }

    besuTransactions(){
        let res = this.connection.request("txpool_besuTransactions",[]);
        return res.result;
    }
}

module.exports=btxpool;