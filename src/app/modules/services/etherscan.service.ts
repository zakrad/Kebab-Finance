import {ethers} from 'ethers'

const ApiKey = process.env.ETHERSCAN_API_KEY
export class AppServiceE {
  etherscanProvider = new ethers.providers.EtherscanProvider('homestead', ApiKey)
}
