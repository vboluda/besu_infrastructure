"use strict" 

const axios = require('axios')
const URL = process.env.STST_URL;
const INTERVAL =  process.env.STST_INTERVAL;

console.info("URL: "+URL);
console.info("INTERVAL: "+INTERVAL);


async function minerOn(){
	let res = await axios.post(URL, {
	  "jsonrpc":"2.0",
	  "method":"miner_start",
	  "params":[],
	  "id":1
	});
	console.log("\x1b[34mMINER STARTED");
}

async function minerOff(){
	let res = await axios.post(URL, {
	  "jsonrpc":"2.0",
	  "method":"miner_stop",
	  "params":[],
	  "id":1
	});
	console.log("\x1b[31mMINER STOPPED");
}

async function exec(){
	let startTime=new Date().getTime();
	let res = await axios.post(URL, {
	  "jsonrpc":"2.0",
	  "method":"txpool_besuTransactions",
	  "params":[],
	  "id":1
	});
	let pending=0;
	let restx=res.data.result;
	var now=new Date();
	for(let i=0,sz=restx.length;i<sz;i++){
		var tx=restx[i];
		let dt=new Date(tx.addedToPoolAt);
		let period=now.getTime() - dt.getTime();
		//console.log(`Diff: ${period} dte ${dt} ----------> ${now}`);
		if(period < 60000){
			pending++;
		}
	}
	
    //let pending=res.data.result.localCount+res.data.result.remoteCount
	console.log(`\x1b[32mTxPool: ${pending}`)
	if(pending>0){
		minerOn();
	}else{
		minerOff();
	}
	let stopTime=new Date().getTime();
	console.log(`\x1b[0m>>>>>>>>>>> Procesed in: ${stopTime - startTime} millis`);
	if(stopTime-startTime>900){
		console.log("WARNING: Processed in more than 900 millis");
	}
}

setInterval(exec, INTERVAL);
