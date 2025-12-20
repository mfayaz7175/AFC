const Web3 = require("web3");

const provider = "http://127.0.0.1:7545";
const web3 = new Web3(provider);

async function main() {
    const accounts = await web3.eth.getAccounts();
    const balances = await Promise.all(
        accounts.map(async (account) => ({
            address: account,
            balance: web3.utils.fromWei(await web3.eth.getBalance(account), "ether"),
        }))
    );

    console.log("Accounts and their balances on Ganache:");
   
    balances.forEach((account, index) => {
        console.log(`Account ${index}: ${account.address}, Balance: ${account.balance} ETH`);
        // console(account.address[index]);
    });

    // Example: Sending a transaction from one account to another
    // await web3.eth.sendTransaction({
    //     from: accounts[0],
    //     to: accounts[1],
    //     value: web3.utils.toWei("1", "ether"),
    // });
    // console.log("Transaction completed: 1 ETH sent from Account 0 to Account 1");
}

main().catch(console.error);
