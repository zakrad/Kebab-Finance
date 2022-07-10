/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'
import Compound from '@compound-finance/compound-js'
import calculateApy from '../services/apy.js'
import Main from '../services/compound.js'
import {ProfileHeader} from '../profile/ProfileHeader'

const CompoundPage: FC = () => {
  const tokens = [
    {ticker: 'ETH', cToken: 'cETH'},
    {ticker: 'DAI', cToken: 'cDAI'},
    {ticker: 'USDC', cToken: 'cUSDC'},
    {ticker: 'USDT', cToken: 'cUSDT'},
    {ticker: 'ZRX', cToken: 'cZRX'},
    {ticker: 'REP', cToken: 'cREP'},
    {ticker: 'BAT', cToken: 'cBAT'},
    {ticker: 'UNI', cToken: 'cUNI'},
    {ticker: 'COMP', cToken: 'cCOMP'},
    {ticker: 'TUSD', cToken: 'cTUSD'},
    {ticker: 'LINK', cToken: 'cLINK'},
    {ticker: 'MKR', cToken: 'cMKR'},
    {ticker: 'AAVE', cToken: 'cAAVE'},
    {ticker: 'YFI', cToken: 'cYFI'},
    {ticker: 'SUSHI', cToken: 'cSUSHI'},
  ]
  const [apys, setApys] = useState<Array<any>>([])
  const [cTokens, setCTokens] = useState<
    Array<{
      ticker: string
      cToken: string
      cTokenA?: string
      supplied?: number
      borrowed?: number
      leftToBorrow?: number
      hasEntered?: boolean
      underWater?: boolean
      supplyApy?: any
      compSupplyApy?: any
      borrowApy?: any
      compBorrowApy?: any
    }>
  >([])

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
    }
    try {
      getServerSideProps()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <>
      {console.log(apys)}
      {console.log(cTokens)}
      {/* begin::Row */}
      <ProfileHeader />
      <div className='row g-6 g-xl-9'>
        {apys.map((token, i) => {
          return (
            <div key={token.ticker} className='col-md-6 col-xl-3'>
              <Card3
                ticker={token.ticker}
                positionValue={token.suppliedValue}
                positionBalance={token.supplied}
                supplyApy={token.supplyApy}
                borrowApy={token.borrowApy}
                compSupplyApy={token.compSupplyApy}
                compBorrowApy={token.compBorrowApy}
                borrowed={token.borrowed}
                hasEntered={token.hasEntered}
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
