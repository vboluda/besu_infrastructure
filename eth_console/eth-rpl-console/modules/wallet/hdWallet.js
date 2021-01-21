"use strict";

const promptly=require("promptly");
const { generateMnemonic,EthHdWallet } = require('eth-hd-wallet')
const fs = require('fs');
var encriptor=require("../../encryptor/encryptor");

class bHDWallet{

    constructor(walletFile="WALLET.SEC",elem=10){
        this.walletFile=walletFile;
        this.generateAddress=elem;
    }

    unlockWallet(password){
        let encMnemonic="";
        if(process.env.HDWALLET_ENC){
            encMnemonic=process.env.HDWALLET_ENC;
        }else{
            try{
                //fs.writeFileSync("hola.txt","Hola tios");
                encMnemonic=""+fs.readFileSync(this.walletFile);
                
            }catch(e){
                console.log(e);
                process.exit(1);
            }
        }

        this.mnemonic=encriptor.decrypt(encMnemonic,password);
        this.wallet=null;
        this.wallet=EthHdWallet.fromMnemonic(this.mnemonic);
        this.address=this.wallet.generateAddresses(this.generateAddress);
    }

    existsWallet(){
        //console.log(`ENV VARIABLE HDWALLET ${process.env.HDWALLET_ENC}`)
        if(process.env.HDWALLET_ENC){
            console.info("Found encrypted mnemonic in HDWALLET_ENC env variable");
            return true;
        }
        try {
            if(fs.existsSync(this.walletFile)){
                console.info("Found encryped Wallet in file "+this.walletFile);
                return true;
            }
          } catch(err) {
            console.error(err)
          }
    }

    signTransaction(tx){
        return this.wallet.signTransaction(tx);
    }

    generateMnemonic(){
        return generateMnemonic();
    }

    encryptMnemonic(mnemonic,password){
        var enc=encriptor.encrypt(mnemonic,password);
        var dec=encriptor.decrypt(enc,password);
    
        if(dec!=mnemonic){
            console.log("ERROR: Ilegal State Error - decripted menmonic differs from initial mnemonic!!!!!!!!!");
            process.exit();
        }
        fs.writeFileSync(this.walletFile, enc); 
    }

    decryptMnemonic(password){
        let encMnemonic=""+fs.readFileSync(this.walletFile);
        return encriptor.decrypt(encMnemonic,password);
    }
}

module.exports=new bHDWallet();