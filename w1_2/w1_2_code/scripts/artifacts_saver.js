'use strict';

var fs = require('fs');

function writeAbiAddr(Artifact, address, contractName, networkName) {
    const fs = require('fs');

    let addrFile = { 
        address: address,
        contractName: contractName, 
    }
    let data = JSON.stringify(addrFile);

    var dir = './deployments/'+networkName;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dir+'/'+contractName+'.json', data);
}

module.exports = writeAbiAddr;
