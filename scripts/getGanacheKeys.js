// Script to get Ganache account private keys using the default mnemonic
// Ganache's default mnemonic: "test test test test test test test test test test test junk"
const { ethers } = require("ethers");

async function main() {
  // Default Ganache mnemonic
  const mnemonic = "test test test test test test test test test test test junk";
  
  // Get the HDNode wallet from mnemonic
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  
  console.log("=== Ganache Pre-funded Accounts ===\n");
  console.log("You can import ANY of these into Trust Wallet using the Private Key.\n");
  
  for (let i = 0; i < 10; i++) {
    // Derivation path: m/44'/60'/0'/0/{index}
    const derivedNode = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
    const wallet = new ethers.Wallet(derivedNode.privateKey);
    
    console.log(`Account ${i + 1}:`);
    console.log(`  Address:    ${wallet.address}`);
    console.log(`  Private Key: ${wallet.privateKey}`);
    console.log(`  Balance:    100 ETH (pre-funded by Ganache)`);
    console.log("");
  }
  
  console.log("=== How to use in Trust Wallet ===");
  console.log("1. Open Trust Wallet");
  console.log("2. Go to Settings > Wallets > Add Wallet");
  console.log("3. Choose 'Import Wallet' > 'Private Key'");
  console.log("4. Paste one of the Private Keys above");
  console.log("5. Make sure you're on the 'Ganache Local' / localhost network");
  console.log("6. You'll have 100 ETH to use for minting!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
