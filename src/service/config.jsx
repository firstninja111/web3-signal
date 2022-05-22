const env = "prod";
const API_BASE = "https://www.alphaspot.xyz/api";
const ASSET_BASE = "https://www.alphaspot.xyz";
// const API_BASE = "http://localhost/api";
// const ASSET_BASE = "http://localhost";
// const API_BASE = "http://local.imagefree.com/api";

const network = {
  name: "Ethereum Mainnet",
  chainId: 1,
  chainHex: "0x1",
  rpc: "https://rpc.ankr.com/eth",
  currency: "AVAX",
};

const initAccount = {
  address: "Connect Wallet",
  balance: 0,
  chainId: 97,
  chainHex: "0x61",
  mainToken: "BNB (Testnet)",
};

export { API_BASE, initAccount, network, ASSET_BASE };
