import {FunctionComponent} from 'react'
import clsx from 'clsx'

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
  return (
    <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
      <button
        type='button'
        className='btn btn-success'
        onClick={() => {
          connect()
        }}
      >
        Connect
      </button>
    </div>
  )
}

export default Walletbar
