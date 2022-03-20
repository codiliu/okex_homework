require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

task("accounts", "Prints the list of accounts", async() => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

module.exports = {
    solidity: {
        // 编译版本
        compilers: [
          {
            version: "0.8.12",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          },
          {
            version: "0.4.26",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          },
          {
            version: "0.5.16",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          },
          {
            version: "0.6.6",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          }
        ]
      },

    abiExporter: {
        path: './deployments/abi',
        clear: true,
        flat: true,
        only: [],
        spacing: 2,
        pretty: true,
    },

    networks: {
        dev: {
            url: "http://127.0.0.1:7545",
            chainId: 1337
        },
        oectestnet: {
            url: "https://exchaintestrpc.okex.org",
            // accounts: [mnemonic],
            accounts: [""],
            chainId: 65
        }
    }
};