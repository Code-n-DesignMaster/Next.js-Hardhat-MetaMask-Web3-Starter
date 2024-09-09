import { HardhatUserConfig, extendConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-etherscan";

extendConfig((config, userConfig) => {
  config.contractSizer = {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
    strict: false,
    only: [],
    except: [],
    outputFile: "",
    unit: "kB",
    ...userConfig.contractSizer,
  };
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      //accounts: [Sepolia_TESTNET_PRIVATE_KEY]
    },
    // arbitrumOne: {
    //   url: "https://arb1.arbitrum.io/rpc",
    //   //accounts: [ARBITRUM_MAINNET_TEMPORARY_PRIVATE_KEY]
    // },
  },
};

export default config;
