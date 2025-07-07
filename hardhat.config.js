require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
require("./tasks")
require("hardhat-deploy");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const SEPOLIA_URL=process.env.SEPOLIA_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY
const PRIVATE_KEY_1=process.env.PRIVATE_KEY_1
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7897");
setGlobalDispatcher(proxyAgent);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 300000, // 300 second
  },
  networks: {
    sepolia:{
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY,PRIVATE_KEY_1],
      chainId:11155111
    }
  },
  etherscan: {
    apiKey:{
      sepolia:ETHERSCAN_API_KEY
    }
  },
  namedAccounts:{
    firstAccount:{
      default:0
    },
    secondAccount:{
      default:1
    }
  }
};
