require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
// 账号的密钥
const privateKey = "xx"
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
              // optimizer: {
              //   enabled: true,
              //   runs: 200
              // }
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
        ],
        // overrides: {
        //   "contracts/interfaces/IUniswapV2Factory.sol": {
        //     version: "0.5.16",
        //     settings: { }
        //   }
        // }
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
            accounts: [`0x${privateKey}`],
            chainId: 65
        },
        ropsten_test: {
          url: "https://ropsten.infura.io/v3/ea8acb377ca84e22aa7f4e4c840426bc",
          // accounts: [mnemonic],
          accounts: [`0x${privateKey}`],
          chainId: 3
        },
        rinkeby_test: {
          url: "https://rinkeby.infura.io/v3/ea8acb377ca84e22aa7f4e4c840426bc",
          // accounts: [mnemonic],
          accounts: [`0x${privateKey}`],
          chainId: 4
        },
        goerli_test: {
          url: "https://goerli.infura.io/v3/ea8acb377ca84e22aa7f4e4c840426bc",
          // accounts: [mnemonic],
          accounts: [`0x${privateKey}`],
          chainId: 5
        }

        // https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
        // https://infura.io/dashboard/ethereum/ea8acb377ca84e22aa7f4e4c840426bc/settings

        
    }
};