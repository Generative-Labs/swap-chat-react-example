const Web3 = require("web3");
//@ts-ignore
console.log(window.ethereum, "window.ethereum");
//@ts-ignore
const web3 = new Web3(window.ethereum);
console.log(web3, "web3");

export function GetERC20Contract(address: string) {
  const abi = require("../assets/abi/ERC20.json");
  return new web3.eth.Contract(abi, address);
}

export function GetERC721Contract(address: string) {
  const abi = require("../assets/abi/ERC721.json");
  return new web3.eth.Contract(abi, address);
}

export function GetERC1155Contract(address: string) {
  const abi = require("../assets/abi/ERC1155.json");
  return new web3.eth.Contract(abi, address);
}
