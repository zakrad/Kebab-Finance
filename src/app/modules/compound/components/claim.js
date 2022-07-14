import { BigNumber, ethers } from 'ethers';
// const {cEthAbi} = require('./abi/cEthAbi.json')

import cEthAbi from '../abi/cEthAbi.json'


const provider = new ethers.providers.JsonRpcProvider(
  // 'https://eth-mainnet.gateway.pokt.network/v1/lb/62cfd5feb37b8e00392ac751'
  'https://rpc.ankr.com/eth_ropsten'
)

const cEthAddress = '0x859e9d8a4edadfedb5a2ff311243af80f85a91b8'
const address = '0xa2c67EaC1Cc3DD40441C9f631fb53D3c5BA2eC41'.toLocaleLowerCase()

const signer = provider.getSigner(address)
const cEth = new ethers.Contract(cEthAddress, cEthAbi, signer)

const claimComp = async () => {
  let tx = await cEth.mint( // use ethgasstation.info (mainnet only)
    { value: ethers.utils.parseEther("1.0") }
  )
  await tx.wait()
}

export default claimComp;