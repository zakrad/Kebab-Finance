import useSWR from 'swr'
import {CryptoHookFactory} from 'types/hooks'

type AccountHookFactory = CryptoHookFactory<string>

export type UseAccountHook = ReturnType<AccountHookFactory>
// deps -> provider, ethereum, contract (web3State)
export const hookFactory: AccountHookFactory =
  ({provider}) =>
  (params) => {
    const swrRes = useSWR(provider ? 'web3/useAccount' : null, () => {
      return 'TEST'
    })

    return swrRes
  }
