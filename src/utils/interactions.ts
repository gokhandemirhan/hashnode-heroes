// Importing libraries
import { NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';

//Importing private key
require('dotenv').config();
declare var window: any;

//Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.REACT_APP_PRIVATE_KEY as string,
    // RPC URL
    ethers.getDefaultProvider('https://rinkeby-light.eth.linkpool.io/')
  )
);
// assign the smart contract address
const nft_smart_contract_address = '0x4Af28AFaD93A1BCBF8A6874d17471A0dCABA0FB3';

// Instantiate NFT Collection module
const nft = sdk.getNFTModule(nft_smart_contract_address);

export const connectWallet: any = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj = {
        status: '',
        address: addressArray[0],
      };
      return obj;
    } catch (err: any) {
      return {
        address: 'Something went wrong, try again.',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: 'Ethereum not available, please install Metamask.',
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '',
        };
      } else {
        return {
          address: '',
          status: '',
        };
      }
    } catch (err: any) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: 'Ethereum not available, please install Metamask.',
    };
  }
};

export const mintNFT = async (metadata: object) => {
  const result = await nft.mint(metadata);
  console.log(result);
  return result;
};

export const transferNFT = async (
  walletAddress: string,
  token: NFTMetadata
) => {
  const result = await nft.transfer(walletAddress, token.id);
  console.log(result);
  return result;
};

export const getOwner = async (walletAddress: string) => {
  if (walletAddress !== '') {
    const result = await nft.getOwned(walletAddress);
    console.log(result);
    return result;
  } else {
    return [];
  }
};

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
