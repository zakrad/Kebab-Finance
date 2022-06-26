import {FunctionComponent} from 'react'
import clsx from 'clsx'
import {HeaderUserMenu} from 'src/_metronic/partials'
import {toAbsoluteUrl} from 'src/_metronic/helpers'

type WalletbarProps = {
  isLoading: boolean
  isInstalled: boolean
  account: string | undefined
  connect: () => void
}

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Walletbar: FunctionComponent<WalletbarProps> = ({
  isInstalled,
  isLoading,
  connect,
  account,
}) => {
  if (isLoading) {
    return (
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <button
          type='button'
          className='btn btn-bg-light btn-active-color-muted indicator-label'
          onClick={() => {}}
        >
          Please Wait...{' '}
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
        </button>
      </div>
    )
  }

  if (account) {
    return (
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='metronic' />
        </div>
        <HeaderUserMenu />
      </div>
    )
  }

  if (isInstalled) {
    return (
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <button
          type='button'
          className='btn btn-success'
          onClick={() => {
            connect()
          }}
        >
          Connect Wallet
        </button>
      </div>
    )
  } else {
    return (
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            window.open('https://metamask.io', '_blank')
          }}
        >
          Install MetaMask
        </button>
      </div>
    )
  }
}

export default Walletbar
