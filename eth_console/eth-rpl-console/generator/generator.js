"use strict";

const fs=require('fs');
const promptly=require("promptly");
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')
var encriptor=require("../encryptor/encryptor");
var wallet=require("../modules/wallet/hdWallet");
var genesisGenerator=require("./genesisTemplate");


(async ()=>{
    var args = require('minimist')(process.argv.slice(2));
    console.log(args);

  
    var arg_help=args.help;
    var arg_genwallet=args.genwallet || false;
    var arg_walletfile=args.walletfile || 'WALLET.dat';
    var arg_mnemonic=args.import || "#";
    var arg_gengenesis=args.generategenesis || false;
    var arg_genesisfile=args.genesisfile || "genesis.json";
    var arg_chainid=args.chainid || "#";
    var arg_period=args.period || 15;
    var arg_gaslimit=args.gaslimit || "0xE4E1C0";
    var arg_keyfile=args.keyfile || "#";
    var arg_addressfile=args.addressfile || "#";

    

    console.info("*****************************************");
    console.info(" GEN WALLET")
    console.info("*****************************************");
    if(arg_help){
        console.log("genwallet [args]");
        console.log("--genwallet \t\t To generate new wallet from scratch");
        console.log("--walletfile [file] \t Output  wallet file");
        console.log("--import [mnemonic] \t Mnemonic words to recover wallet");
        console.log("--keyfile \t Private key file for first validator");
        console.log("--addressfile \t Address file for first validator");
        
        console.log("--help \t\t\t Shows this text");
        process.exit(0);
    }

    if(arg_gengenesis){
        if(fs.existsSync(arg_genesisfile)){
            console.info("ERROR: Genesis file exists. Please provide new file name");
            process.exit(1);
        }
        if(arg_chainid=="#"){
            console.info("ERROR: Please provide a Chain Identifier");
            process.exit(1);
        }
    }

    if(fs.existsSync(arg_walletfile)){
        console.info("ERROR: Wallet file exists. Please provide new file name");
        process.exit(1);
    }
    if((arg_mnemonic=="#") && !arg_genwallet){
        console.info("ERROR: Import option requires mnemonic");
        process.exit(1);
    }
    if((arg_mnemonic!="#") &&(arg_genwallet)){
        console.info("ERROR: non compatible configuration");
        console.info("Cannot use genwallet with import");
        process.exit(1);
    }
  
    
    console.info(`Wallet File: ${arg_walletfile}`);
    var mnemonic="";
    if(arg_genwallet){
        console.info(`Generate new wallet`);
        mnemonic=generateMnemonic();
    }else{
        mnemonic=arg_mnemonic;
    }
        
    console.info("Provide encryption password: ");
    var password="";
    while(true){
        password = await promptly.password('Type password to lock Wallet: ', { replace: '*' });
        let password2 = await promptly.password('Retype password to lock Wallet: ', { replace: '*' });
        if(password!=password2){
            console.info("Passwords do not match. Please try again.");
        }else{
            break;
        }
    }
    

    var enc=encriptor.encrypt(mnemonic,password);
    var dec=encriptor.decrypt(enc,password);

    if(dec!=mnemonic){
        console.log("ERROR: Ilegal State Error - decripted menmonic differs from initial mnemonic!!!!!!!!!");
        process.exit(1);
    }

    console.info("PLAIN MNEMONIC (KEEP IT SAFE!)");
    console.info("------------------------------");
    console.info(dec);
    console.info("");
    console.info("ENCRYPTED MNEMONIC (DO NOT FORGET PROVIDED PASSWORD)");
    console.info("----------------------------------------------------");
    console.info(enc);
    fs.writeFileSync(arg_walletfile,enc);

    wallet.walletFile=arg_walletfile;
    wallet.unlockWallet(password);
    console.info("Adresses: ");
    wallet.address.forEach((e,i,o) => {
        console.info(`[${i}]: "${e}" ${(i==0 ? '(Signer)' : '')} ${(i==1 ? '(Prefunded)' : '')}`);
        console.info(`Private key: "${wallet.wallet.getPrivateKey(e).toString('hex')}"`)
    });
    if(arg_gengenesis){
        var genesis=genesisGenerator(wallet.address[0].substring(2),arg_chainid,arg_period,arg_gaslimit,wallet.address[1].substring(2));
        console.info(`Generated genesis in file: ${arg_genesisfile}`);
        fs.writeFileSync(arg_genesisfile,JSON.stringify(genesis));
    }
    
    if(arg_keyfile!="#"){
        console.log("Generated key file: "+arg_keyfile);
        fs.writeFileSync(arg_keyfile,wallet.wallet.getPrivateKey(wallet.address[0]).toString('hex'));
    }
    if(arg_addressfile!="#"){
        console.log("Generated key file: "+arg_addressfile);
        fs.writeFileSync(arg_addressfile,wallet.address[0]);
    }
})();