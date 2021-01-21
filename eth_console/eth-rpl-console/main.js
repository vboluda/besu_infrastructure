"use strict";


(async ()=> {
    console.info("");
    console.info("ETHEREUM MANAGEMENT CONSOLE (v0.5)");
    console.info("----------------------------------");
    console.info("(c) Vicente Boluda Vias 2020");
    console.info("");
    console.info("Platform: "+process.platform);
    console.info("Nodejs: "+process.version);
    console.info("");


    //var args = require('minimist')(process.argv.slice(2));
    //console.log(args);

    // if(args[2]==="generateWallet"){
    //     (async ()=>{
    //         console.info("YOU ARE GOING TO DELETE CURRENT WALLET (IF EXISTS) AND REGENERATE NEW ONE");
    //         console.info("DO NOT DO IT UNLESS YOU ARE AWARE OF ITS IMPLICATIONS!!!!!!!!!!!!!!!!!!!!");
    //         console.info("(TO KEEP SAFE, PRESS ^C )")
    //         var wallet=require("./modules/wallet/hdWallet");
    //         await wallet.generateWallet();
    //         process.exit();
    //     })();
    // }

    var Config=require("./modules/config/Config");
    console.info("Retrieve config information");
    var config=new Config();
    config.retrieve();

    const promptly=require("promptly");
    var wallet=require("./modules/wallet/hdWallet");
    if(!wallet.existsWallet()){
        console.info("NO WALLET PRESENT. GENERATE NEW ONE");
        var mnemonic= await promptly.prompt('Provide menmonic to import or live blank to generate: ',{retry:false,default:'#'});
        if(mnemonic==="#"){
            mnemonic=wallet.generateMnemonic();
        }
        console.info("Store mnemonic safe!!!!!!!");
        console.info("########################################################################");
        console.info(mnemonic);
        console.info("########################################################################");
        var password="";
        var password2="#";
        while(true){
            password = await promptly.password('Type password to lock Wallet: ', { replace: '*' });
            password2 = await promptly.password('Retype password to lock Wallet: ', { replace: '*' });
            if(password!=password2){
                console.info("Passwords do not match. Please try again.");
            }else{
                break;
            }
        }
        wallet.encryptMnemonic(mnemonic,password);
        wallet.unlockWallet(password);
        console.info("Adresses: ");
        wallet.address.forEach((e,i,o) => {
            console.info(`[${i}]: "${e}"`);
        });
        console.info("");
    }else{
        console.info("Wallet found");
        const password = await promptly.password('Provide password to unlock Wallet: ', { replace: '*' });
    
        wallet.unlockWallet(password);
    }

    const repl = require('repl');
    const State=require("./modules/loadModules")
    var state=State(wallet,config);
    
    var prompt=config.config.prompt;
    if(!prompt) prompt="CONSOLE $ ";
    const myRepl = repl.start(prompt);

    state.exit=function(){
        process.exit();
    }

    state.reloadConfig=function(){
        state=State(wallet,config);
    }

    Object.assign(myRepl.context, state);
    
})();
