import {createContext, FunctionComponent, useContext, useEffect, useState} from 'react'
// import detectEthereumProvider from '@metamask/detect-provider'
// import Web3 from 'web3'
import {createDefaultState, Web3State} from './utils'

const Web3Context = createContext<Web3State>(createDefaultState())

const Web3Provider: FunctionComponent = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

  useEffect(() => {
    function initWeb3() {
      const ethereum = window.ethereum
    }

    initWeb3()
  }, [])

  //   useEffect(() => {
  //     const loadProvider = async () => {
  //       const provider = await detectEthereumProvider()
  //       if (provider) {
  //         const web3 = new Web3(provider)
  //         setWeb3Api({
  //           provider,
  //           web3,
  //           contract: null,
  //           isLoading: false,
  //         })
  //       } else {
  //         setWeb3Api((api) => ({...api, isLoading: false}))
  //         console.error('Please, install metamask')
  //       }
  //     }
  //   }, [])

  return <Web3Context.Provider value={{web3Api}}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  return useContext(Web3Context)
}

export default Web3Provider
