const { ethers, network } = require('hardhat');
const myToken = require(`../deployments/${network.name}/MyToken.json`);
const myTokenMarket = require(`../deployments/${network.name}/MyTokenMarket.json`);

async function main() {
  const [deployer] = await ethers.getSigners();
  let token = await ethers.getContractAt(myToken.contractName, myToken.address, deployer);
  //铸币 100个
  await token.mint(deployer.address, ethers.utils.parseEther('100'));

  console.log(myToken.address)
  //授权
  await token.approve(myTokenMarket.address, ethers.utils.parseEther('100'));

  let tokenMarket = await ethers.getContractAt(myTokenMarket.contractName, myTokenMarket.address, deployer);
  //增加流动性
  console.log("添加流动性");

  let b = await token.balanceOf(deployer.address);
  console.log("持有token:" + ethers.utils.formatUnits(b, 18));

  await tokenMarket.AddLiquidity(ethers.utils.parseEther('100'), {value : ethers.utils.parseEther('0.001')});
  
  //兑换
  await tokenMarket.buyToken({value : ethers.utils.parseEther('0.0005')});

  b = await token.balanceOf(deployer.address);
  console.log("购买到:" + ethers.utils.formatUnits(b, 18));

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

//npx hardhat run scripts/token_mint_6.js --network goerli