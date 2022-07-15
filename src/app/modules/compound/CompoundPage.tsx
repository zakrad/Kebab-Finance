/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'
import Compound from '@compound-finance/compound-js'
import calculateApy, {getInfo} from '../services/compound.js'
import {ProfileHeader} from '../profile/ProfileHeader'
import {useAccount} from '../web3'

let totalBorrow = 0
let totalSupply = 0
let netApySum = 0
let netApy = 0

const CompoundPage: FC = () => {
  const {account} = useAccount()

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
      totalBorrow = 0
      totalSupply = 0
    } catch (error) {
      console.error(error)
      totalBorrow = 0
      totalSupply = 0
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
