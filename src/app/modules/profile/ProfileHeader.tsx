/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import ClaimComp from '../compound/components/claim'
import {useAccount, useNetwork} from '../web3'
import Avatar from 'boring-avatars'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  leftToBorrow?: number
  lend?: number
  borrowed?: number
  netApy?: number
  comp?: any
  usedPower?: number
  CF?: number
}


const ProfileHeader: FC<Props> = ({leftToBorrow, lend, borrowed, netApy, comp, usedPower, CF}) => {
  const {account} = useAccount()
  const {network} = useNetwork()

  const notify = (error: any) =>
    toast.error(error.error.message, {
      position: toast.POSITION.TOP_RIGHT,
    })

  return (
    <div
      className={`card mb-5 mb-xl-10 ${
        (!account.data ||
          !account.isInstalled ||
          network.isLoading ||
          account.isLoading ||
          !network.isSupported) &&
        'overlay overlay-block'
      }`}
    >
      <ToastContainer />
      <div className='card-body pt-9 pb-0 overlay-wrapper'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              {/* <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' /> */}
              <Avatar
                size={160}
                name={account.data}
                variant='beam'
                colors={['#9DC9AC', '#936A5B', '#9D75F1', '#FCC06A', '#F1FAFF']}
              />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded bg-primary text-white min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr037.svg'
                        className='svg-icon-3x svg-icon-white me-2'
                      />
                      <div className='fs-2 fw-bolder'>{lend}$</div>
                    </div>

                    <div className='fw-bold fs-6 text-white'>Lend Value</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-info text-white min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr036.svg'
                        className='svg-icon-3x svg-icon-white me-2'
                      />
                      <div className='fs-2 fw-bolder'>{borrowed}$</div>
                    </div>

                    <div className='fw-bold fs-6 text-white'>Borrowed Value</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-light-success min-w-125px w-200px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <img
                        className='mx-1'
                        alt='Pic'
                        width='30px'
                        src={toAbsoluteUrl('/media/icons/duotune/compound/COMP.svg')}
                      />
                      <div className='fs-2 fw-bolder'>{comp}</div>
                      <button
                        type='button'
                        onClick={async () => {
                          try {
                            await ClaimComp(account)
                          } catch (error) {
                            notify(error)
                          }
                        }}
                        className='btn btn-success btn-sm mx-10'
                      >
                        <div className='fs-7 fw-bolder'>Claim</div>
                      </button>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Comp Rewards</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Used Liquidity</span>
                  <span className='fw-bolder fs-6'>{usedPower}%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: `${usedPower}%`}}
                  ></div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded bg-light-primary min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/ecommerce/ecm011.svg'
                        className='svg-icon-3x svg-icon-primary me-2'
                      />
                      <div className='fs-2 fw-bolder'>{netApy}%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Net Apy</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-light-dark min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/finance/fin002.svg'
                        className='svg-icon-3x svg-icon-dark me-2'
                      />
                      <div className='fs-2 fw-bolder'>{leftToBorrow}$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Left to Borrow</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Debt / Collateral</span>
                  <span className='fw-bolder fs-6'>{CF}%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: `${CF}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!account.data && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-success'
            onClick={() => {
              account.connect()
            }}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {!network.isSupported && account.data && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={async () => {
              try {
                //@ts-ignore
                await ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{chainId: '0x1'}],
                })
              } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                //@ts-ignore
                if (switchError.code === 4902) {
                  try {
                    //@ts-ignore
                    await ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '1',
                          chainName: 'Ethereum',
                          rpcUrls: ['https://mainnet.infura.io/v3/'],
                        },
                      ],
                    })
                  } catch (addError) {
                    // handle "add" error
                  }
                }
                // handle other "switch" errors
              }
            }}
          >
            Switch to Ethereum
          </button>
        </div>
      )}
      {!account.isInstalled && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
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
      )}
      {(network.isLoading || account.isLoading) && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-bg-light btn-active-color-muted indicator-label'
            onClick={() => {}}
          >
            Loading... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </button>
        </div>
      )}
    </div>
  )
}

export {ProfileHeader}
