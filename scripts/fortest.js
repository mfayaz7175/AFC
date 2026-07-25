const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");
// web3.eth.getAccounts()
// .then(accounts =>
//     console.log(accounts)
// );

// web3.eth.sendTransaction({
//     from:'0xE957aE72409220CE6C790e4AdfA7548Fdd0bb4fD',
//     to:'0xb7eFA3d69dB5345263c70bBe9Fc06e17f56bc0a1',
//     value:web3.utils.toWei('1','ether')
// }).then(receipt =>
//     console.log(receipt)
// );

// web3.eth.getBalance('0xb7eFA3d69dB5345263c70bBe9Fc06e17f56bc0a1')
// .then(b=>
//     console.log(web3.utils.fromWei(b))
// )

// web3.eth.getBlockNumber()
// .then(bn=>
//     console.log(bn)
// )

web3.eth.getBlock('latest')
.then(block=>
    console.log(block.hash)
)
