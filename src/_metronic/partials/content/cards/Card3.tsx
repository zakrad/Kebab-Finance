/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import BorrowApy from 'src/app/modules/compound/components/borrowApy'
import BorrowButton from 'src/app/modules/compound/components/borrowButton'
import {EnterMarket, ExitMarket} from 'src/app/modules/compound/components/EnterExitMarket'
import SupplyApy from 'src/app/modules/compound/components/supplyApy'
import SupplyButton from 'src/app/modules/compound/components/supplyButton'
import {useAccount} from 'src/app/modules/web3'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
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
  underlyingPrice: number
  leftToBorrow: number
  usedPower: number
  underlyingBalance: number
  cF: number
  allowance: number
}

const Card3: FC<Props> = ({
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
  underlyingPrice = '',
  leftToBorrow = '',
  usedPower = '',
  underlyingBalance = '',
  cF = '',
  allowance = '',
}) => {
  const {account} = useAccount()
  const notify = (error: any) =>
    toast.error(error.error.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  return (
    <>
      <ToastContainer />
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
                    try {
                      await ExitMarket(account, cToken)
                    } catch (error) {
                      notify(error)
                    }
                  } else {
                    try {
                      await EnterMarket(account, cToken)
                    } catch (error) {
                      notify(error)
                    }
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
            <SupplyApy
              supplyApy={supplyApy}
              compSupplyApy={compSupplyApy}
              hasEntered={hasEntered}
            />
            <BorrowApy
              borrowApy={borrowApy}
              compBorrowApy={compBorrowApy}
              hasEntered={hasEntered}
            />
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
          </div>
          <div className='d-flex'>
            <button
              disabled={!hasEntered}
              className={`btn btn-sm ${hasEntered ? 'btn-primary' : 'btn-light'} d-flex mx-2`}
              data-bs-toggle='modal'
              data-bs-target={'#kt_modal_1' + ticker}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              Supply
            </button>
            <button
              className={`btn btn-sm ${hasEntered ? 'btn-primary' : 'btn-light'} d-flex mx-8`}
              data-bs-toggle='modal'
              data-bs-target={'#kt_modal_2' + ticker}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr090.svg' className='svg-icon-3' />
              Borrow
            </button>
          </div>
        </div>
      </div>
      <SupplyButton
        underlyingPrice={underlyingPrice}
        supplyApy={supplyApy}
        compSupplyApy={compSupplyApy}
        leftToBorrow={leftToBorrow}
        usedPower={usedPower}
        ticker={ticker}
        balance={underlyingBalance}
        supplied={positionBalance}
        cF={cF}
        cTokenAddress={cTokenAddress}
        cToken={cToken}
        allowance={allowance}
      />
      <BorrowButton
        underlyingPrice={underlyingPrice}
        borrowApy={borrowApy}
        compBorrowApy={compBorrowApy}
        leftToBorrow={leftToBorrow}
        usedPower={usedPower}
        ticker={ticker}
        balance={underlyingBalance}
        borrowed={borrowed}
        cF={cF}
        cTokenAddress={cTokenAddress}
        cToken={cToken}
        allowance={allowance}
      />
    </>
  )
}

export {Card3}
