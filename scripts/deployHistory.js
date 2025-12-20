const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("YourContract");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Contract deployed to:", token.address);

  // Save deployment details
  const deploymentData = {
    address: token.address,
    deployer: deployer.address,
    network: "ganache",
  };

  fs.writeFileSync('deployments/ganache/YourContract.json', JSON.stringify(deploymentData, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
