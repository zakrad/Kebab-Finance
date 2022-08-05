/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

import {Link} from 'react-router-dom'

import Avatar from 'boring-avatars'

type WalletbarProps = {
  account: string | undefined
  network: string | undefined
}

const HeaderUserMenu: FC<WalletbarProps> = ({account, network}) => {
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3 ribbon ribbon-end ribbon-clip'>
          <div className='symbol symbol-50px me-5'>
            <Avatar
              name={account}
              variant='beam'
              colors={['#9DC9AC', '#936A5B', '#9D75F1', '#FCC06A', '#F1FAFF']}
            />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center'>
              <span className='badge badge-light-primary fw-bolder fs-8 px-0'>{network}</span>
            </div>
          </div>
          <div className='ribbon-label'>
            {account?.substring(0, 6) + '......' + account?.substring(37)}
            <span className='ribbon-inner bg-info'></span>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/dashboard'} className='menu-link px-5'>
          Dashboard
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to='/tokens' className='menu-link px-5'>
          <span className='menu-text'>Owned Tokens</span>
          <span className='menu-badge'>
            <span className='badge badge-light-warning badge-circle fw-bolder fs-7'>3</span>
          </span>
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          <span className='menu-text'>Owned NFTs</span>
          <span className='menu-badge'>
            <span className='badge badge-light-success badge-circle fw-bolder fs-7'>10</span>
          </span>
        </a>
      </div>

      <div className='separator my-2'></div>

      <div
        className='menu-item px-5 my-1'
        onClick={async () => {
          await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {},
              },
            ],
          })
        }}
      >
        <a href='#' className='menu-link px-5'>
          Change Wallet
        </a>
      </div>

      <div className='menu-item px-5'></div>
    </div>
  )
}

export {HeaderUserMenu}
