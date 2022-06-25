import useSWR from 'swr'
import {CryptoHookFactory} from 'types/hooks'

type AccountHookFactory = CryptoHookFactory<string>

export type UseAccountHook = ReturnType<AccountHookFactory>
// deps -> provider, ethereum, contract (web3State)
export const hookFactory: AccountHookFactory =
  ({provider, ethereum}) =>
  () => {
    const swrRes = useSWR(
      provider ? 'web3/useAccount' : null,
      async () => {
        const accounts = await provider!.listAccounts()
        const account = accounts[0]
        if (!account) {
          throw ' Cannot retreive account!Please Connect to web3 wallet.'
        }

        return account
      },
      {
        revalidateOnFocus: false,
      }
    )

    const connect = async () => {
      try {
        ethereum?.request({method: 'eth_requestAccounts'})
      } catch (e) {
        console.error(e)
      }
    }

    return {
      ...swrRes,
      connect,
    }
  }
