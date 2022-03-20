const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_log.js')
const wETH9 = require(`../deployments/${network.name}/WETH.json`);
const uniswapV2Factory = require(`../deployments//${network.name}/UniswapV2Factory.json`);
async function main() {
    const [deployer] = await ethers.getSigners();

    // WETH = await ethers.getContractFactory("WETH9");
    // weth = await WETH.deploy();
    // await weth.deployed();
    // console.log("WETH address: ", weth.address);
    // await writeAddr(weth.address, "WETH", network.name);

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
     const uniswapV2Router02 = await UniswapV2Router02.deploy(uniswapV2Factory.address, wETH9.address);
    //等待部署完成
    await uniswapV2Router02.deployed();
    console.log("Router合约地址：", uniswapV2Router02.address);
    //储存部署信息在文件
    let artifact = await artifacts.readArtifact("UniswapV2Router02");
    await writeAbiAddr(artifact, uniswapV2Router02.address, "UniswapV2Router02", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
