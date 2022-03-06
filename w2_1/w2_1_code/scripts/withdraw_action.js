const { ethers, network } = require("hardhat")

const Addr = require(`../deployments/${network.name}/Bank.json`)

async function main() {
    let [owner] = await ethers.getSigners();

    let bank = await ethers.getContractAt("Bank",
    Addr.address,
    owner);
    await bank.withdraw();
} 

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });