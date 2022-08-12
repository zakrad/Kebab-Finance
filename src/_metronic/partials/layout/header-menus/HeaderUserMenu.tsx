/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import Avatar from 'boring-avatars'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {getTotalItem} from 'src/app/modules/services/quicknode'
import {AppService} from 'src/app/modules/services/covalent.service'

type WalletbarProps = {
  account: string | undefined
  network: string | undefined
}

const appService = new AppService()

const HeaderUserMenu: FC<WalletbarProps> = ({account = '', network = ''}) => {
  const [length, setLength] = useState<any>(0)
  const [mbd, setMbd] = useState<Array<any>>([])

  const notify = (error: any) =>
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    })

  useEffect(() => {
    async function AddressHistoricalValue(address: string) {
      try {
        const value = await appService.getHistoricalValue(account)
        setMbd(value.data.items)
        return value.data.items
      } catch (e) {
        console.log(e)
      }
    }
    async function getTotalItems() {
      try {
        setLength(await getTotalItem(account))
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      AddressHistoricalValue(account)
      getTotalItems()
    }
  }, [])
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <ToastContainer />
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
        <Link to='#' className='menu-link px-5'>
          <span className='menu-text'>Owned Tokens</span>
          <span className='menu-badge'>
            <span className='badge badge-light-warning badge-circle fw-bolder fs-7'>
              {mbd.length}
            </span>
          </span>
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to='/nft-profile' className='menu-link px-5'>
          <span className='menu-text'>Owned NFTs</span>
          <span className='menu-badge'>
            <span className='badge badge-light-success badge-circle fw-bolder fs-7 p-1'>
              {length}
            </span>
          </span>
        </Link>
      </div>

      <div className='separator my-2'></div>

      <div
        className='menu-item px-5 my-1'
        onClick={async () => {
          try {
            await window.ethereum.request({
              method: 'wallet_requestPermissions',
              params: [
                {
                  eth_accounts: {},
                },
              ],
            })
          } catch (error) {
            notify(error)
          }
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
