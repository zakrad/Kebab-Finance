import useSWR from 'swr'
import {CryptoHookFactory} from 'types/hooks'

const NETWORKS: {[k: string]: string} = {
  1: 'Ethereum',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  43114: 'Avalanche',
  137: 'Polygon',
  42161: 'Arbitrum',
  1337: 'Ganache',
}

const targetId = 1
const targetNetwork = NETWORKS[targetId]

type UseNetworkResponse = {
  isLoading: boolean
  isSupported: boolean
  targetNetwork: string
  isConnectedToNetwork: boolean
}

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>
// deps -> provider, ethereum, contract (web3State)
export const hookFactory: NetworkHookFactory =
  ({provider, isLoading}) =>
  () => {
    const {data, isValidating, ...swr} = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId

        if (!chainId) {
          throw 'Cannot retreive network. Please, refresh the browser or connect to other one.'
        }
        return NETWORKS[chainId]
      },
      {
        revalidateOnFocus: false,
      }
    )

    const isSupported = data === targetNetwork

    return {
      ...swr,
      data,
      isValidating,
      targetNetwork,
      isSupported,
      isConnectedToNetwork: !isLoading && isSupported,
      isLoading: isLoading as boolean,
    }
  }
