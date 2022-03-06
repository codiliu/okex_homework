// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { artifacts,network } = require('hardhat');

const writeAbiAddr = require('./artifacts_saver.js')

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
    //deploy contract
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    //wait deploy finish
    await bank.deployed();
    console.log("contract address: ", bank.address);
    //save deploy info.
    let artifact = await artifacts.readArtifact("Bank");
    // await writeAbiAddr(artifact, bank.address, "Bank", network.name);
    await writeAbiAddr(artifact, bank.address, "Bank", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
