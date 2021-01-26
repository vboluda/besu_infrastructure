"use strict";

var os = require( 'os' );
var nets = os.networkInterfaces();




let result=[];
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            console.log("FOUND IP "+net.address);
            result.push(net.address)
        }
    }
}

console.log(JSON.stringify(result));