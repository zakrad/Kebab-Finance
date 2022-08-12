import {ethers} from 'ethers'


export class AppServiceE {
  etherscanProvider = new ethers.providers.EtherscanProvider(
    'homestead',
    'HVP7WPKI5VGRM42W9RPDNWGTICDFTQ48HS'
  )
}
