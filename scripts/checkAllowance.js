// const { ethers } = require("ethers");

// async function getTotalAllowance(tokenAddress, ownerAddress, spenderAddress, providerUrl) {
//     // Set up the provider (using a local Ganache node in this case)
//     const provider = new ethers.providers.JsonRpcProvider(providerUrl);

//     // ERC-20 token contract ABI (simplified to include only the allowance function and Approval/Transfer events)
//     const abi = [
//         "function allowance(address owner, address spender) view returns (uint256)",
//         "event Approval(address indexed owner, address indexed spender, uint256 value)",
//         "event Transfer(address indexed from, address indexed to, uint256 value)"
//     ];

//     // Create a contract instance
//     const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

//     try {
//         // Track the total allowance
        // let totalAllowance = ethers.BigNumber.from(0);

        // // Get all Approval events for the specified owner and spender
        // const approvalFilter = tokenContract.filters.Approval(ownerAddress, spenderAddress);
        // const approvalEvents = await tokenContract.queryFilter(approvalFilter);

        // // Sum all allowances
        // approvalEvents.forEach(event => {
        //     totalAllowance = totalAllowance.add(event.args.value);
        // });

        // console.log("Total Approved Allowance:", ethers.utils.formatUnits(totalAllowance, 18));

//         // Get the remaining allowance directly
//         const remainingAllowance = await tokenContract.allowance(ownerAddress, spenderAddress);
//         console.log("Remaining Allowance:", ethers.utils.formatUnits(remainingAllowance, 18));

//         // Track the total `TransferFrom` amount
//         let totalTransferFrom = ethers.BigNumber.from(0);

//         // Get all Transfer events originating from the owner address
//         const transferFilter = tokenContract.filters.Transfer(ownerAddress, null);
//         const transferEvents = await tokenContract.queryFilter(transferFilter);

//         transferEvents.forEach(event => {
//             totalTransferFrom = totalTransferFrom.add(event.args.value);
            
//         });

//         console.log("Total Transferred From Owner:", ethers.utils.formatUnits(totalTransferFrom, 18));
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// }

// // Example usage:
// const tokenAddress = "0x67acdA21c4bEec8EbeD5F51016Ffa7c580cF351C"; // Replace with the token contract address
// const ownerAddress = "0xbA2E8FD7ef2d3c5C3fF400a1d147b6a9a8D762F8"; // Replace with the owner's address
// const spenderAddress = "0xC95334fB8256f8c6Eb0d7e0aA497C796ce50498d"; // Replace with the spender's address
// const providerUrl = "http://127.0.0.1:7545"; // Replace with your Infura or other provider URL (Ganache URL in this case)

// getTotalAllowance(tokenAddress, ownerAddress, spenderAddress, providerUrl);




const { ethers } = require("ethers");

async function getAllowanceAndTransfers(tokenAddress, ownerAddress, spenderAddress, providerUrl) {
    // Initialize provider and contract
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const abi = [
        "function allowance(address owner, address spender) view returns (uint256)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)",
        "event Transfer(address indexed from, address indexed to, uint256 value)"
    ];
    const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

    try {
        // Fetch the remaining allowance
        // const remainingAllowance = await tokenContract.allowance(ownerAddress, spenderAddress);
        // console.log("Remaining Allowance:", ethers.utils.formatUnits(remainingAllowance, 18), "tokens");
        let totalApproval = ethers.BigNumber.from(0);

        const approvalFilter = tokenContract.filters.Approval(ownerAddress,spenderAddress);
        const eventsFilter = await tokenContract.queryFilter(approvalFilter);

        eventsFilter.forEach(event => {
            totalApproval = totalApproval.add(event.args.value)
        });
        // Track `TransferFrom` amounts

        console.log("Total Approved Allowance:", ethers.utils.formatUnits(totalApproval, 18));
        
        let totalTransferFrom = ethers.BigNumber.from(0);

        // Filter Transfer events where spenderAddress is the initiator
        const transferFilter = tokenContract.filters.Transfer(ownerAddress, null);
        const transferEvents = await tokenContract.queryFilter(transferFilter);

        for (const event of transferEvents) {
            const txReceipt = await provider.getTransactionReceipt(event.transactionHash);
            const tx = await provider.getTransaction(txReceipt.transactionHash);
           
            
            // Check if the spender initiated the transfer
            if (tx.from.toLowerCase() === spenderAddress.toLowerCase()) {
                totalTransferFrom = totalTransferFrom.add(event.args.value);
                // console.log(tx.to.toLowerCase());
                
            }
        }

        console.log("Total Transferred Using `TransferFrom`:", ethers.utils.formatUnits(totalTransferFrom, 18), "tokens");
        console.log(`remaining allowance ${ethers.utils.formatUnits(totalApproval)-ethers.utils.formatUnits(totalTransferFrom)}`)

    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage
const tokenAddress = "0x67acdA21c4bEec8EbeD5F51016Ffa7c580cF351C"; // Replace with your ERC-20 token contract address
const ownerAddress = "0xbA2E8FD7ef2d3c5C3fF400a1d147b6a9a8D762F8"; // Replace with the owner's address
const spenderAddress = "0xC95334fB8256f8c6Eb0d7e0aA497C796ce50498d"; // Replace with the spender's address
const providerUrl = "http://127.0.0.1:7545"; // Replace with your provider URL (Ganache in this case)

getAllowanceAndTransfers(tokenAddress, ownerAddress, spenderAddress, providerUrl);
