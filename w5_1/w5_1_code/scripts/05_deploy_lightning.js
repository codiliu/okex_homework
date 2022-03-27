const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
  
    const UniswapLightningTest = await ethers.getContractFactory("UniswapLightningTest");
    const uniswapLightningTest = await UniswapLightningTest.deploy();
    //等待部署完成
    await uniswapLightningTest.deployed();
    console.log("TokenA 合约地址：", uniswapLightningTest.address);
    //储存部署信息在文件
    let artifact = await artifacts.readArtifact("UniswapLightningTest");
    await writeAbiAddr(artifact, myToken.address, "UniswapLightningTest", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

//npx hardhat run scripts/deploy_token_4.js --network goerli