var encriptor=require("./encryptor");

var pass="12345";



var enc=encriptor.encrypt("box fork try primary close loop shield kite legal produce fitness grab",pass);

var dec=encriptor.decrypt(enc,pass);

console.log(enc);
console.log(dec);