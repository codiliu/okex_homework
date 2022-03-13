const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());

     const ERC721NFT = await ethers.getContractFactory("ERC721NFT");
     const eRC721NFT = await ERC721NFT.deploy();

    await eRC721NFT.deployed();
    console.log("NFT合约地址：", eRC721NFT.address);

    let artifact = await artifacts.readArtifact("ERC721NFT");
    await writeAbiAddr(artifact, eRC721NFT.address, "ERC721NFT", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});