const ethers = require('ethers');

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

const pk = process.argv[2];
const data = process.argv[3];

const provider = ethers.getDefaultProvider('kovan');

const wallet = new ethers.Wallet(pk, provider);

let balancePromise = wallet.getBalance();

balancePromise.then((balance) => {
    console.log(`current balance: ${balance} wei's`);
});

const tx = {
    to: wallet.address,  // the target address or ENS name
    data: '0x' + data.hexEncode(),
}

const sendPromise = wallet.sendTransaction(tx);

sendPromise.then((tx) => {
    console.log(tx);
});