const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const tokenAddress = "0xb518Ff71b149Bcb9831334414D46094dff96bB89";
  const recipient = "0x473790E86b6e0AD601B75008b3B50267698eBE54";
  const amount = hre.ethers.utils.parseEther("100");

  const token = await hre.ethers.getContractAt("AfCoin", tokenAddress);
  const tx = await token.transfer(recipient, amount);
  await tx.wait();

  console.log(`Sent 100 AFC to ${recipient}`);
  console.log(`Tx: ${tx.hash}`);
}

main().catch(console.error);
