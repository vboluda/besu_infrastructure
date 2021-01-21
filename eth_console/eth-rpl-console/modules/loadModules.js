"use strict";

const Web3 = require('web3')

const Handler=require("./lib/PromiseHandler");
const ContractAdaptor=require("./lib/ContractAdaptor");
const Misc=require("./utils/misc");

const Wallet=require("./wallet/hdWallet");
const BConnection=require("./besu/connection");
const besu_admin=require("./besu/admin");
const besu_eth=require("./besu/eth");
const besu_txpool=require("./besu/txpool");
const besu_test=require("./besu/test");
const Storage=require("./lib/Storage");
const Config=require("./config/Config");

const txpermission_config=require("../config/ContractTxPremissionConfig");

var besu_connection0=new BConnection("http://192.168.1.3:8545");
//var besu_connection0=new BConnection("http://127.0.0.1:5678");
var besu_connectionWS0="ws://192.168.1.3:8546";
//var besu_connectionWS0="ws://127.0.0.1:5679";
//var besu_web3_0=new Web3(besu_connectionWS0);

function loadModules(wallet,config){
   
    var state={
        misc: new Misc(),
        wallet:wallet,    
        storage: new Storage("data","STORAGE.DAT"),
        config: config
    }
    if(config.config.besu){
        config.config.besu.forEach(e => {
            let key=e.name;
            console.info("Get configuration from besu instance: "+key);
            try{
                let besu_web3_0=new Web3(e.ws_url);
                let besu_connection=new BConnection(e.rpc_url);
                let value={
                    connection: key,
                    admin:new besu_admin(besu_connection),
                    eth:new besu_eth(besu_connection,wallet),
                    txpool:new besu_txpool(besu_connection),
                    web3:new Proxy(besu_web3_0,Handler),
                    contracts:{
                        txpermission:new ContractAdaptor(Wallet,besu_web3_0,txpermission_config.abi,txpermission_config.address,txpermission_config.opts)
                    }
                };
                state[key]=value;
            }catch(error){
                console.error(error);
            }
        });
    };

    return state;
}
module.exports=loadModules;