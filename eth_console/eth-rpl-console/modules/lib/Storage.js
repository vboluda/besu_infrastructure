"use strict";

const fs = require('fs');

class Storage{

        constructor(prop,fileName){
            this._property=prop;
            this[prop]={};
            this._fileName=fileName;
        }

        retrieve(){
            if(!fs.existsSync(this._fileName)){
                return;
            }
            let raw=fs.readFileSync(this._fileName);
            this[this._property]=JSON.parse(raw);
        }

        store(){
            let str=JSON.stringify(this[this._property]);
            fs.writeFileSync(this._fileName,str);
        }


}

module.exports=Storage;