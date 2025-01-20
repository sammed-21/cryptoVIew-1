import Web3, { providers } from "web3";
import BigNumber from "bignumber.js";

const initializeWeb3 = (infuraUrl) => {
  return new Web3(new providers.HttpProvider(infuraUrl));
};

const getERC20Contract = (web3, abi, tokenAddress) => {
  return new web3.eth.Contract(abi, tokenAddress);
};

export default {
  initializeWeb3,
  getERC20Contract,
};
