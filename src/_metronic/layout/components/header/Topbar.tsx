import React, {FC} from 'react'
import {useAccount, useNetwork} from 'src/app/modules/web3'
import Walletbar from './Walletbar'

const Topbar: FC = () => {
  const {account} = useAccount()
  const {network} = useNetwork()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {network.isLoading
        ? 'Please Wait...'
        : !account.isInstalled
        ? 'Install MetaMask'
        : !network.isSupported
        ? 'wrong network'
        : `is suport: ${network.isSupported} + ${network.data} + target : ${network.targetNetwork}`}
      <Walletbar
        isInstalled={account.isInstalled}
        isLoading={account.isLoading}
        connect={account.connect}
        account={account.data}
        isSupported={network.isSupported}
        targetNetwork={network.targetNetwork}
        network={network.data}
      />
    </div>
  )
}

export {Topbar}
