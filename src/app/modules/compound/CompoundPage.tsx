/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'
import Compound from '@compound-finance/compound-js'
import calculateApy from '../services/apy.js'

const CompoundPage: FC = () => {
  const [apys, setApys] = useState<Array<any>>([])

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
      {/* begin::Row */}
      <div className='row g-6 g-xl-9'>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/eth.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/dai.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdc.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdt.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/zrx.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/rep.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/bat.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/uni.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/comp.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/tusd.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/link.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/mkr.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/aave.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/yfi.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/sushi.svg'
            ticker='ETH'
            positionValue={200}
            positionBalance={1.4}
            supplyApy={1}
            borrowApy={1}
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
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
