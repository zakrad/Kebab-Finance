import {ethers} from 'ethers'
const ApiKey = process.env.REACT_APP_ETHERSCAN_API_KEY
export class AppServiceE {
  etherscanProvider = new ethers.providers.EtherscanProvider('homestead', ApiKey)
}
