import Web3 from "web3";
import { AbiItem } from "web3-utils";

import { abi } from "./BuyMeACoffee.json";

const web3ProviderUrl = process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL;
const web3 = new Web3(Web3.givenProvider || web3ProviderUrl);

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Update with your deployed contract address
const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

export { web3, contract };
