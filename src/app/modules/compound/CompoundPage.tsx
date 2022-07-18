/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'
import Compound from '@compound-finance/compound-js'
import calculateApy, {getInfo} from '../services/compound.js'
import {ProfileHeader} from '../profile/ProfileHeader'
import {KTSVG} from 'src/_metronic/helpers'

let totalBorrow = 0
let totalSupply = 0
let netApySum = 0
let netApy = 0

const CompoundPage: FC = () => {
  const [apys, setApys] = useState<Array<any>>([])
  const [info, setInfo] = useState<any>({
    comp: 0,
    leftToBorrow: 0,
    underWater: false,
  })

  useEffect(() => {
    async function getServerSideProps() {
      setApys(
        await Promise.all([
          calculateApy(Compound.cETH, 'ETH'),
          calculateApy(Compound.cDAI, 'DAI'),
          calculateApy(Compound.cUSDC, 'USDC'),
          calculateApy(Compound.cUSDT, 'USDT'),
          calculateApy(Compound.cZRX, 'ZRX'),
          calculateApy(Compound.cREP, 'REP'),
          calculateApy(Compound.cBAT, 'BAT'),
          calculateApy(Compound.cUNI, 'UNI'),
          calculateApy(Compound.cCOMP, 'COMP'),
          calculateApy(Compound.cTUSD, 'TUSD'),
          calculateApy(Compound.cLINK, 'LINK'),
          calculateApy(Compound.cMKR, 'MKR'),
          calculateApy(Compound.cAAVE, 'AAVE'),
          calculateApy(Compound.cYFI, 'YFI'),
          calculateApy(Compound.cSUSHI, 'SUSHI'),
        ])
      )
      setInfo(await getInfo())
      totalBorrow = 0
      totalSupply = 0
    }
    try {
      getServerSideProps()
    } catch (error) {
      console.error(error)
    }
  }, [])

  apys.forEach((token) => {
    if (token.hasEntered) {
      totalBorrow += token.borrowed
      totalSupply += token.suppliedValue
      netApySum += token.suppliedValue * token.supplyApy - token.borrowed * token.borrowApy
    }
  })
  if (netApySum > 0) {
    netApy = Math.round((netApySum / totalSupply) * 100) / 100
  } else if (netApySum < 0) {
    netApy = Math.round((netApySum / totalBorrow) * 100) / 100
  } else {
    netApy = 0
  }

  const usedPower =
    (Math.round((totalBorrow * 100) / (totalBorrow + info.leftToBorrow)) * 100) / 100
  const CF = Math.round(((totalBorrow * 100) / totalSupply) * 100) / 100

  return (
    <>
      <button
        className={`btn btn-sm d-flex mx-2`}
        data-bs-toggle='modal'
        data-bs-target='#kt_modal_1'
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
        Supply
      </button>
      <div className='rounded-bottom modal fade' tabIndex={-1} id='kt_modal_1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='d-flex justify-content-center flex-row'>
              <ul className='nav nav-tabs nav-line-tabs fs-6 border-0 w-100 h-50px'>
                <li className='nav-item justify-content-center d-flex w-100 btn-group' role='group'>
                  <a
                    className='nav-link active btn rounded-0 btn-active-primary '
                    data-bs-toggle='tab'
                    href='#kt_tab_pane_1'
                  >
                    Supply Collateral
                  </a>
                  <a
                    className='nav-link btn rounded-0 btn-active-primary'
                    data-bs-toggle='tab'
                    href='#kt_tab_pane_2'
                  >
                    Redeem Collateral
                  </a>
                </li>
              </ul>
            </div>
            <div className='modal-body'>
              <div className='tab-content ' id='myTabContent'>
                <div className='tab-pane fade active show' id='kt_tab_pane_1' role='tabpanel'>
                  <label className='form-label'>Enter Amount to Supply</label>
                  <input
                    type='text'
                    className='form-control form-control-solid w-25'
                    placeholder='0'
                  />
                </div>
                <div
                  className='tab-pane fade'
                  id='kt_tab_pane_2'
                  role='tabpanel'
                >
                  <label className='form-label'>Enter Amount to Withdraw</label>
                  <input
                    type='text'
                    className='form-control form-control-solid w-25'
                    placeholder='0'
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {console.log(apys)}
      {console.log(info)}
      <ProfileHeader
        leftToBorrow={info.leftToBorrow}
        lend={Math.round(totalSupply * 100) / 100}
        borrowed={Math.round(totalBorrow * 100) / 100}
        netApy={netApy}
        comp={info.comp}
        usedPower={usedPower}
        CF={CF}
      />
      <div className='row g-6 g-xl-9'>
        {apys.map((token, i) => {
          return (
            <div key={token.ticker} className='col-md-6 col-xl-3'>
              <Card3
                ticker={token.ticker}
                cToken={token.cToken}
                cTokenAddress={token.cTokenAddress}
                positionValue={token.suppliedValue}
                positionBalance={token.supplied}
                supplyApy={token.supplyApy}
                borrowApy={token.borrowApy}
                compSupplyApy={token.compSupplyApy}
                compBorrowApy={token.compBorrowApy}
                borrowed={token.borrowed}
                hasEntered={token.hasEntered}
                underWater={info.underWater}
              />
            </div>
          )
        })}
      </div>
      {/* end::Row */}
    </>
  )
}

const CompoundWrapper: FC = () => {
  const intl = useIntl()
  const {provider} = useWeb3()

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts()
    console.log(accounts[0])
  }

  if (provider) {
    getAccounts()
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <CompoundPage />
    </>
  )
}

export {CompoundWrapper}
