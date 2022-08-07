/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'
import Compound from '@compound-finance/compound-js'
import calculateApy, {getInfo} from '../services/compound.js'
import {ProfileHeader} from '../profile/ProfileHeader'
import {PageTitle} from 'src/_metronic/layout/core'
import {useAccount, useNetwork} from '../web3'

let totalBorrow = 0
let totalSupply = 0
let netApySum = 0
let netApy = 0

const CompoundPage: FC = () => {
  const {account} = useAccount()
  const {network} = useNetwork()

  const address = account.data

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
          calculateApy(Compound.cETH, 'ETH', address),
          calculateApy(Compound.cDAI, 'DAI', address),
          calculateApy(Compound.cUSDC, 'USDC', address),
          calculateApy(Compound.cUSDT, 'USDT', address),
          calculateApy(Compound.cZRX, 'ZRX', address),
          calculateApy(Compound.cREP, 'REP', address),
          calculateApy(Compound.cBAT, 'BAT', address),
          calculateApy(Compound.cUNI, 'UNI', address),
          calculateApy(Compound.cCOMP, 'COMP', address),
          calculateApy(Compound.cTUSD, 'TUSD', address),
          calculateApy(Compound.cLINK, 'LINK', address),
          calculateApy(Compound.cMKR, 'MKR', address),
          calculateApy(Compound.cAAVE, 'AAVE', address),
          calculateApy(Compound.cYFI, 'YFI', address),
          calculateApy(Compound.cSUSHI, 'SUSHI', address),
        ])
      )
      setInfo(await getInfo(address))
      totalBorrow = 0
      totalSupply = 0
    }
    if (account.data && network.isSupported) {
      try {
        getServerSideProps()
      } catch (error) {
        console.error(error)
      }
    }
  }, [account.data, network.isSupported])
  useEffect(() => {
    const changeDetails = async () => {
      apys.forEach((token) => {
        if (token.hasEntered) {
          totalBorrow += token.borrowed
          totalSupply += token.suppliedValue
          netApySum += token.suppliedValue * token.supplyApy - token.borrowed * token.borrowApy
        }
      })
    }
    changeDetails()
  }, [apys])

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
      <PageTitle children={'Compound Protocol'} />
      {console.log(apys)}
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
                underlyingPrice={token.underlyingPrice}
                leftToBorrow={info.leftToBorrow}
                usedPower={usedPower}
                underlyingBalance={token.underlyingBalance}
                cF={token.cF}
                allowance={token.allowance}
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
      <CompoundPage />
    </>
  )
}

export {CompoundWrapper}
