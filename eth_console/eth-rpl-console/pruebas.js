//const Wallet=require("./modules/wallet/hdWallet");

const { EthHdWallet } = require('eth-hd-wallet')
const mnemonic = 'box fork try primary close loop shield kite legal produce fitness grab';

var wallet=EthHdWallet.fromMnemonic(mnemonic);

var addr=wallet.generateAddresses(1)[0];

console.log(JSON.stringify(addr));