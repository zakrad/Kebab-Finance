import {useHooks} from 'src/app/providers/web3'

export const useAccount = () => {
  const hooks = useHooks()
  const swrRes = hooks.useAccount()
  return {
    account: swrRes,
  }
}

export const useNetwork = () => {
  const hooks = useHooks()
  const swrRes = hooks.useNetwork()

  return {
    network: swrRes,
  }
}
