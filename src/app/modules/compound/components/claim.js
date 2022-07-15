import Compound from '@compound-finance/compound-js';
// import { ethers } from 'ethers';
// const {cEthAbi} = require('./abi/cEthAbi.json')

// import cEthAbi from '../abi/cEthAbi.json'


// const provider = new ethers.providers.Web3Provider(window.ethereum);
const compound = new Compound(window.ethereum);

// const cEthAddress = '0x859e9d8a4edadfedb5a2ff311243af80f85a91b8'



const ClaimComp = async (account) => {
  // const signer = provider.getSigner(account.data)
  // const cEth = new ethers.Contract(cEthAddress, cEthAbi, signer)

  const trx = await compound.claimComp({ from: account.data });
}

export default ClaimComp;