require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const fs = require('fs');

const mnemonic = fs.readFileSync(".secret").toString().trim();

console.log(mnemonic)
module.exports = {
  solidity: "0.8.4",
  networks: {
    development: {
      url: "http://127.0.0.1:7545",
      chainId: 1337
    },
    oectestnet: {
      url: "https://exchaintestrpc.okex.org",
      accounts: [mnemonic],
      accounts: ["719b918526b6df496b493512ddd90ea5b4e78ee8fe516d22d47c74a897d3a39e"],
      chainId: 65
    }
  }
};

