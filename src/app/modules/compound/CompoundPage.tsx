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
            name='$200'
            job='0.4 ETH'
            supplyApy='%0.2'
            borrowApy='%4.5'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/dai.svg'
            name='Melody Macy'
            job='Marketing Analytic'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdc.svg'
            name='Max Smith'
            job='Software Enginer'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdt.svg'
            name='Sean Bean'
            job='Web Developer'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/zrx.svg'
            name='Brian Cox'
            job='UI/UX Designer'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/rep.svg'
            name='Mikaela Collins'
            job='Head Of Marketing'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/bat.svg'
            name='Francis Mitcham'
            job='Software Arcitect'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/uni.svg'
            name='Olivia Wild'
            job='System Admin'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/comp.svg'
            name='Neil Owen'
            job='Account Manager'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/tusd.svg'
            name='Dan Wilson'
            job='Web Desinger'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/link.svg'
            name='Emma Bold'
            job='Corporate Finance'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/mkr.svg'
            name='Ana Crown'
            job='Customer Relationship'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/aave.svg'
            name='Ana Crown'
            job='Customer Relationship'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/yfi.svg'
            name='Ana Crown'
            job='Customer Relationship'
            supplyApy='$14,560'
            borrowApy='$236,400'
            compSupplyApy={1}
            compBorrowApy={1}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/sushi.svg'
            name='Ana Crown'
            job='Customer Relationship'
            supplyApy='$14,560'
            borrowApy='$236,400'
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
