import {FunctionComponent, useEffect, useState} from 'react'
import clsx from 'clsx'
import {HeaderUserMenu} from 'src/_metronic/partials'
import Avatar from 'boring-avatars'

type WalletbarProps = {
  isLoading: boolean
  isInstalled: boolean
  account: string | undefined
  connect: () => void
  isSupported: boolean
  targetNetwork: string
  network: string | undefined
}

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Walletbar: FunctionComponent<WalletbarProps> = ({
  isInstalled,
  isLoading,
  connect,
  account,
  isSupported,
  targetNetwork,
  network,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState(network)
  const handleSelect = (e: any) => {
    setSelectedNetwork(e.target.value)
  }

  useEffect(() => {
    if (selectedNetwork === 'Polygon') {
      try {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89',
              rpcUrls: ['https://polygon-rpc.com/'],
              chainName: 'Matic Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              blockExplorerUrls: ['https://explorer.matic.network'],
            },
          ],
        })
      } catch (error) {
        console.log(error)
      }
    } else if (selectedNetwork === 'Binance Smart Chain') {
      try {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38',
              rpcUrls: ['https://bsc-dataseed.binance.org'],
              chainName: 'Binance Smart Chain',
              nativeCurrency: {
                name: 'Binance Coin',
                symbol: 'BNB',
                decimals: 18,
              },
              blockExplorerUrls: ['https://bscscan.com'],
            },
          ],
        })
      } catch (error) {
        console.log(error)
      }
    } else if (selectedNetwork === 'Avalanche') {
      try {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xA86A',
              rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
              chainName: 'Avalanche Mainnet C-Chain',
              nativeCurrency: {
                name: 'Avalanche',
                symbol: 'AVAX',
                decimals: 18,
              },
              blockExplorerUrls: ['https://snowtrace.io/'],
            },
          ],
        })
      } catch (error) {
        console.log(error)
      }
    } else if (selectedNetwork === 'Ropsten Test Network') {
      try {
        console.log('connect to ethereum')
      } catch (error) {
        console.log(error)
      }
    } else if (selectedNetwork === 'Ethereum') {
      console.log('connect to ethereum')
    }
  }, [selectedNetwork])

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
      <>
        <div
          className={clsx(
            'd-flex align-items-center pulse pulse-success',
            toolbarButtonMarginClass
          )}
          id='kt_header_user_menu_toggle'
        >
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <Avatar
              name={account}
              variant='beam'
              colors={['#9DC9AC', '#936A5B', '#9D75F1', '#FCC06A', '#F1FAFF']}
            />
          </div>
          <span className='pulse-ring border-3'></span>
          <HeaderUserMenu account={account} network={network} />
        </div>
      </>
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
