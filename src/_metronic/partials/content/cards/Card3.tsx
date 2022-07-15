/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {EnterMarket, ExitMarket} from 'src/app/modules/compound/components/EnterExitMarket'
import {useAccount} from 'src/app/modules/web3'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'

type Props = {
  online?: boolean
  positionValue?: number
  positionBalance?: number
  ticker: string
  cToken: string
  cTokenAddress: string
  supplyApy: number
  borrowApy: number
  compSupplyApy?: number
  compBorrowApy?: number
  borrowed?: number
  hasEntered: boolean
  underWater: boolean
}

const Card3: FC<Props> = ({
  online = false,
  positionValue,
  positionBalance,
  supplyApy,
  borrowApy,
  compSupplyApy = '',
  compBorrowApy = '',
  ticker = '',
  cToken = '',
  cTokenAddress = '',
  borrowed = '',
  hasEntered,
  underWater,
}) => {
  const {account} = useAccount()
  return (
    <div className='card'>
      <div
        className={`card-body d-flex flex-column p-4 ${
          hasEntered
            ? 'bg-light-primary border border-gray-700 border-dashed rounded'
            : underWater
            ? 'bg-danger border rounded'
            : ''
        }`}
      >
        <div className='d-flex mb-4 justify-content-between'>
          <div className='d-flex'>
            <div className='mb-5'>
              <div className='symbol symbol-50px symbol-circle'>
                {
                  <img
                    alt='Pic'
                    src={toAbsoluteUrl(`/media/icons/duotune/compound/${ticker}.svg`)}
                  />
                }
                {online && (
                  <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n3 mt-n3'></div>
                )}
              </div>
            </div>
            <div>
              <a href='#' className='fs-3 text-gray-800 text-hover-primary fw-bolder mb-0 mx-3'>
                ${positionValue}
              </a>

              <div className='fs-5 fw-bold text-gray-400 mb-6 mx-3'>
                {positionBalance + ' '}
                {ticker}
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <button
              type='button'
              onClick={async () => {
                if (hasEntered) {
                  await ExitMarket(account, cToken)
                } else {
                  await EnterMarket(account, cToken)
                }
              }}
              className={`btn btn-sm ${
                hasEntered
                  ? 'p-2 btn-light border border-gray-300 rounded'
                  : underWater
                  ? 'p-1 btn-light-danger border border-gray-300 rounded'
                  : 'p-3 btn-primary'
              } d-flex`}
            >
              {hasEntered ? 'Disable' : underWater ? 'ready to liquidate' : 'Enable'}
            </button>
          </div>
        </div>
        <div className='d-flex flex-center flex-wrap my-0'>
          <div
            className={`border border-gray-${
              hasEntered ? '400' : '300'
            } border-dashed rounded min-w-100px py-1 mx-1 px-1 mb-3`}
          >
            {compSupplyApy ? (
              <div className='fs-7 fw-bolder text-gray-700'>
                {supplyApy}% + {compSupplyApy}%
                {
                  <img
                    className='mx-1'
                    alt='Pic'
                    width='20px'
                    src={toAbsoluteUrl('/media/icons/duotune/compound/COMP.svg')}
                  />
                }
              </div>
            ) : (
              <div className='fs-7 fw-bolder text-gray-700'>{supplyApy}%</div>
            )}
            <div className='fw-bold text-gray-400'>Supply APY</div>
          </div>

          <div
            className={`border border-gray-${
              hasEntered ? '400' : '300'
            } border-dashed rounded min-w-100px py-1 px-1 mb-3`}
          >
            {compBorrowApy ? (
              <div className='fs-7 fw-bolder text-gray-700'>
                {borrowApy}%- {compBorrowApy}%
                {
                  <img
                    className='mx-1'
                    alt='Pic'
                    width='20px'
                    src={toAbsoluteUrl('/media/icons/duotune/compound/comp.svg')}
                  />
                }
              </div>
            ) : (
              <div className='fs-7 fw-bolder text-gray-700'>{borrowApy}%</div>
            )}
            <div className='fw-bold text-gray-400'>Borrow APY</div>
          </div>
        </div>
        <div className='d-flex flex-center flex-wrap mb-5'>
          <div
            className={`border border-gray-${
              hasEntered ? '400' : '300'
            } border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3`}
          >
            <div className='fs-6 fw-bolder text-gray-700'>${borrowed}</div>
            <div className='fw-bold text-gray-400'>Borrowed</div>
          </div>

          {/* <div className='border border-gray-300 border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{1}</div>
            <div className='fw-bold text-gray-400'>Borrow APY</div>
          </div> */}
        </div>
        <div className='d-flex'>
          <a
            href='#'
            className={`btn btn-sm ${hasEntered ? 'btn-primary' : 'btn-light'} d-flex mx-2`}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Supply
          </a>
          <a
            href='#'
            className={`btn btn-sm ${hasEntered ? 'btn-primary' : 'btn-light'} d-flex mx-8`}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr090.svg' className='svg-icon-3' />
            Borrow
          </a>
        </div>
      </div>
    </div>
  )
}

export {Card3}
