import {MetaMaskInpageProvider} from '@metamask/providers'
// import {Contract, ethers, providers} from 'ethers'
import {setupHooks, Web3Hooks} from 'src/app/modules/web3/setupHooks'
import {Web3Dependencies} from 'types/hooks'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export type Web3State = {
  isLoading: boolean
  hooks: Web3Hooks
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({isLoading: true} as any),
  }
}

export const createWeb3State = ({ethereum, provider, contract, isLoading}: Web3Dependencies) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ethereum, provider, contract, isLoading}),
  }
}

// const NETWORK_ID = 1337

// export const loadContract = async (
//   name: string, // NftMarket
//   provider: providers.Web3Provider
// ): Promise<Contract> => {
//   if (!NETWORK_ID) {
//     return Promise.reject('Network ID is not defined!')
//   }

//   const res = await fetch(`/contracts/${name}.json`)
//   const Artifact = await res.json()

//   if (Artifact.networks[NETWORK_ID].address) {
//     const contract = new ethers.Contract(
//       Artifact.networks[NETWORK_ID].address,
//       Artifact.abi,
//       provider
//     )

//     return contract
//   } else {
//     return Promise.reject(`Contract: [${name}] cannot be loaded!`)
//   }
// }
