import React, {FC} from 'react'
import {useAccount, useNetwork} from 'src/app/modules/web3'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import Walletbar from './Walletbar'

const Topbar: FC = () => {
  const {config} = useLayout()
  const {account} = useAccount()
  const {network} = useNetwork()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      {/* Activities */}
      {/* NOTIFICATIONS */}
      {/* Quick links */}
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
      {/* begin::Aside Toggler */}
          </div>
  )
}

export {Topbar}
