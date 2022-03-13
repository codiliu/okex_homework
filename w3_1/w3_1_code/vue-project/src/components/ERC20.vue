<script>
import { ethers } from 'ethers'

import vaultAddr from "../../../deployments/dev/oectestnet-Vault.json";
import t20Addr from "../../../deployments/dev/oectestnet-MyERC20.json";

import t20Abi from "../../../deployments/abi/MyERC20.json";
import vaultAbi from "../../../deployments/abi/Vault.json";


import { premitTypedDate } from "../typedData.js";

export default {

  name: 'erc20',

  data() {
    return {

      recipient: null,
      amount: null,
      balance: null,

      name: null,
      decimal: null,
      symbol: null,
      supply: null,

      stakeAmount: null,

      accountAddress: "",
      notConnectedWalletError: false,
      walletIsConnected: false,
      mintMsg: null,
      transferMsg: null,
      approvMsg: null,
      depositMsg: null,
      withdrawMsg: null,
      t20Balance: 0,
      t20TotalSupply: 0,
      vaultBalance: 0,
      onAdditionalCount: null,
      onAdditionalAddr: null,
      onTransferCount: null,
      onTransferAddr: null,
      onDepositCount: null,
      onWithdrawCount: null,

    }
  },

  async created() {
    await this.initAccount()
    this.initContract()
    //获取钱包信息
    this.getWalletInfo();
    // this.getInfo();
    // this.getNonce();

    this.getVaultBalance();
  },

  methods: {
    async initAccount(){
      if(window.ethereum) {
        console.log("initAccount");
        try{
          // 获得所有的账号
          this.accounts = await window.ethereum.enable()
          console.log("accounts:" + this.accounts);
          this.account = this.accounts[0];
          this.currProvider = window.ethereum;

          //初始化提供者
          this.provider = new ethers.providers.Web3Provider(window.ethereum);

          //获取当前钱包地址
          this.signer = this.provider.getSigner()

          //获取网络信息
          let network = await this.provider.getNetwork()

          this.chainId = network.chainId;
          console.log("chainId:", this.chainId);

        } catch(error){
          console.log("User denied account access", error)
        }
      }else{
        console.log("Need install MetaMask")
      }
    },
    async getWalletInfo() {
      this.accountAddress = this.account;

      new Promise((resolve, reject) => {
        this.tokenContract.totalSupply().then(result => {
          return resolve(ethers.utils.formatEther(result))
		    })
      })
      .then((result) => {
         this.t20TotalSupply = result
      });
      
      new Promise((resolve, reject) => {
        this.tokenContract.balanceOf().then(result => {
          return resolve(ethers.utils.formatEther(result))
		    })
      })
      .then((result) => {
         this.t20Balance = result
      });

    },
    getVaultBalance() {
      new Promise((resolve, reject) => {
        this.vaultContract.userBalance(this.accountAddress).then(result => {
          return resolve(ethers.utils.formatEther(result))
		    })
      })
      .then((result) => {
         this.vaultBalance = result
      });

    },
    onWithdrawT20(){
      this.vaultContract.withdraw(ethers.utils.parseEther(this.onWithdrawCount))
    },
    onAdditionalT20() {
      this.tokenContract.mint(this.onAdditionalAddr, ethers.utils.parseEther(this.onAdditionalCount)).then((r) => {
        console.log(r);  // 返
      })
    },
    onTransferT20(){
      // 0x39c517a7274821b18a2f8ff8cB19eCec310d0551
      // this.tokenContract.transfer(this.onTransferAddr,  ethers.utils.parseEther(this.onTransferCount)).then((r) => {
      //   console.log(r);  // 返
      // })

      new Promise(async (resolve, reject) => {
        this.tokenContract.transfer(this.onTransferAddr, ethers.utils.parseEther(this.onTransferCount)).then(result => {
          resolve(result.hash);
        }).catch(err => {
                console.log('err:',err)
                reject(err);
            });
      })

      // new Promise(async (resolve, reject) => {
      //   this.tokenContract.transfer(this.onTransferAddr, ethers.utils.parseEther(this.onTransferCount)).then(result => {
      //     resolve(result.hash);
      //   }).catch(err => {
      //           console.log('err:',err)
      //           reject(err);
      //       });
	    // }).then((hash) => {
        
      // });

      // t20Transfer(this.onTransferAddr, this.onTransferCount).then((hash) => {
      //   //转账提交成功
      //   this.transferMsg = this.$message({
      //     message: "转账提交成功,[" + hash + "]",
      //     type: "loading",
      //     hasMask: true,
      //     position: "top-right",
      //     showClose: true,
      //   });
      //   this.listenerResult(hash, this.transferMsg);
      // });
    },

    t20Allowance() {
      this.tokenContract.allowance(this.accountAddress, vaultAddr.address).then((res) => {

        this.tokenContract.approve(vaultAddr.address, ethers.utils.parseEther(this.onDepositCount)).then((res)=>{
          console.log(res)
          this.vaultContract.deposit(ethers.utils.parseEther(this.onDepositCount))
        })
        
        // if (res >= this.onDepositCount) {
        //   //存款
        //   this.vaultContract.deposit(ethers.utils.parseEther(this.onDepositCount))
        // } else {
        //   //授权
        //   this.tokenContract.approve(vaultAddr.address, ethers.utils.parseEther(this.onDepositCount))
        // }
      });
    },
    
    async initContract() {
      //初始化银行合约
      this.vaultContract = new ethers.Contract(vaultAddr.address, vaultAbi.abi, this.signer);
      this.tokenContract = new ethers.Contract(t20Addr.address, t20Abi.abi, this.signer);
    }, 

    
   
    getNonce() {
      this.erc20Token.nonces(this.account).then(r => {
        this.nonce = r.toString();
        console.log("nonce:" + this.nonce);
      })
    },

    transfer() {
      let amount = ethers.utils.parseUnits(this.amount, 18);
      this.erc20Token.transfer(this.recipient, amount).then((r) => {
        console.log(r);  // 返回值不是true
        this.getInfo();
      })
    },

    //初始化提供者
    initProviders() {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      return provider;
    },
    //初始化签名者
    initSigner() {
      let provider = initProviders();
      provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      return signer;
    }

  }
}


</script>

<template>
  <div >

    <h2>1. 代币合约MyERC20测试</h2>
    <br>
    <div>ERC20代币总增发量：{{ t20TotalSupply }}</div>
      <div>
        <input
          placeholder="增发代币地址"
          v-model="onAdditionalAddr"
          style="width: 40%"
        />&nbsp;<input
          placeholder="增发数量"
          v-model="onAdditionalCount"
          style="width: 12%"
        />&nbsp;<button @click="onAdditionalT20">增 发</button>
      </div>

      <br>

      <div>用户钱包地址：{{ accountAddress }}</div>
      <div>用户ERC20代币余额：{{ t20Balance }}</div>
      <div>
        <input
          placeholder="转账代币给谁"
          v-model="onTransferAddr"
          style="width: 40%"
        />&nbsp;<input
          placeholder="转账数量"
          v-model="onTransferCount"
          style="width: 12%"
        />&nbsp;<button @click="onTransferT20">转 账</button>
      </div>

      <br><br><br>
      <h2>2. Vault 合约测试</h2>
      <br>

      <div>用户存款余额：{{ vaultBalance }}</div>
      <div>
        <input
          placeholder="存款数量"
          v-model="onDepositCount"
          style="width: 20%"
        />&nbsp;<button @click="t20Allowance">存款到合约</button>
      </div>
      <div>
        <input
          placeholder="取款数量"
          v-model="onWithdrawCount"
          style="width: 20%"
        />&nbsp;<button @click="onWithdrawT20">从合约取款</button>
      </div>
      
<!-- 
      <div>
        <br /> Token名称 : {{ name  }}
        <br /> Token符号 : {{  symbol }}
        <br /> Token精度 : {{  decimal }}
        <br /> Token发行量 : {{  supply }}
        <br /> 我的余额 : {{ balance  }}
      </div>

      <div >
        <br />转账到:
        <input type="text" v-model="recipient" />
        <br />转账金额
        <input type="text" v-model="amount" />
        <br />
        <button @click="transfer()"> 转账 </button>
      </div>

    <div >
      <input v-model="stakeAmount" placeholder="输入质押量"/>
      <button @click="permitStake">离线授权存款</button>
    </div> -->

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

div {
  font-size: 1.2rem;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
