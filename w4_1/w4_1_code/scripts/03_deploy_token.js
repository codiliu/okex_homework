const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_log.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyToken = await ethers.getContractFactory("MyToken");
     const myToken = await MyToken.deploy();
    //等待部署完成
    await myToken.deployed();
    console.log("Token合约地址：", myToken.address);
    //储存部署信息在文件
    let artifact = await artifacts.readArtifact("MyToken");
    await writeAbiAddr(artifact, myToken.address, "MyToken", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

//npx hardhat run scripts/deploy_token_4.js --network goerli