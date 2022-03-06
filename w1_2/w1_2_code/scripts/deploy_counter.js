// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// import {writeAbiAddr} from "./artifacts_saver.js"

const { artifacts, network } = require("hardhat");

const writeAbiAddr = require('./artifacts_saver.js')

const hre = require("hardhat");

async function main() {

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);

  let Artifact = await artifacts.readArtifact("Counter");
//   console.log(Artifact)
//   console.log(counter.address)
//   console.log(network.name)
  await writeAbiAddr(Artifact, counter.address, "Counter", network.name);
  
//   await writeAbiAddr(Artifact, counter.address, "Counter", network.name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });