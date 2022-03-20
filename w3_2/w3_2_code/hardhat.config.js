require("@nomiclabs/hardhat-waffle");


task("accounts", "Prints the list of accounts", async() => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

module.exports = {
    solidity: {
        compilers: [
          {
            version: "0.4.18",
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
                runs: 999999
              }
            }
          },
          {
            version: "0.6.12",
            settings: {
              optimizer: {
                enabled: true,
                runs: 5000
              }
            }
          }
        ],
      },
    networks: {
        dev: {
          url: "http://127.0.0.1:7545",
          chainId: 1337
        },
        oectestnet: {
          url: "https://exchaintestrpc.okex.org",
          // accounts: [mnemonic],
          accounts: ["719b918526b6df496b493512ddd90ea5b4e78ee8fe516d22d47c74a897d3a39e"],
          chainId: 65
        }
    }
    
};



