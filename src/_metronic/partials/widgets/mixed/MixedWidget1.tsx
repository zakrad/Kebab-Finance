/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {AppService} from '../../../../app/modules/services/covalent.service'
import {useAccount, useNetwork} from 'src/app/modules/web3'
import {Link} from 'react-router-dom'

type Props = {
  className: string
  color: string
}

const appService = new AppService()

const MixedWidget1: React.FC<Props> = ({className, color}) => {
  const {account} = useAccount()
  const {network} = useNetwork()
  const [gta, setGta] = useState<Array<any>>([])
  let addressBalance: number = 0

  const address = account.data

  useEffect(() => {
    async function getAddressTokens(address: string) {
      try {
        const value = await appService.getAddressTokens(address)
        const value2 = value.data.items.filter((token: any) => token.type === 'cryptocurrency')
        setGta(value2)
        return value2
      } catch (e) {
        console.log(e)
      }
    }
    if (address) {
      getAddressTokens(address)
    }
  }, [])

  gta.forEach((token: any) => {
    addressBalance += token.quote
  })

  return (
    <div
      className={`card ${className} ${
        (!account.data || !account.isInstalled || network.isLoading || account.isLoading) &&
        'overlay overlay-block'
      }`}
    >
      {/* begin::Body */}
      <div className='card-body p-0 overlay-wrapper'>
        {/* begin::Header */}
        <div className={`overlay-wrapper px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bolder fs-3'>Wallet Summery</h3>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-7'>Your Balance</span>
            <span className='fw-bolder fs-2x pt-1'>${Math.round(addressBalance * 100) / 100}</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='overlay-wrapper shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
          style={{marginTop: '-100px'}}
        >
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6 overlay-wrapper'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <img
                  alt='Compound'
                  className='svg-icon-2x'
                  src='/media/icons/duotune/ecommerce/cmp.svg'
                />
              </span>
            </div>
            {/* end::Symbol1111 */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <Link to='/compound' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Compound
                </Link>
                <div className='text-gray-400 fw-bold fs-7'>Supplied Value</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>$0</div>
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6 overlay-wrapper'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <img
                  alt='Aave'
                  className='svg-icon-2x'
                  src='/media/icons/duotune/ecommerce/aave.svg'
                />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <Link to='/aave' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  AAVE
                </Link>
                <div className='text-gray-400 fw-bold fs-7'>Supplied Value</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>$0</div>
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}

          <div className='d-flex align-items-center mb-6 overlay-wrapper'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <img alt='Kebab' className='svg-icon-1' src='/media/logos/logo-22.svg' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <Link to='/app' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Kebab Finance
                </Link>
                <div className='text-gray-400 fw-bold fs-7'>Supplied Value</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>$0</div>
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
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
                Loading...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </button>
            </div>
          )}
        </div>
        {/* end::Items */}
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
              Loading...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </button>
          </div>
        )}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget1}
