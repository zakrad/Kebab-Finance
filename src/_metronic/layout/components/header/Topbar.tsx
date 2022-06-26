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

      <Walletbar
        isInstalled={account.isInstalled}
        isLoading={account.isLoading}
        connect={account.connect}
        account={account.data}
      />

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
