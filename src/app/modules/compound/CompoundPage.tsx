/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {useWeb3} from 'src/app/providers/web3'
import {Card3} from '../../../_metronic/partials/content/cards/Card3'

const CompoundPage: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-6 g-xl-9'>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/eth.svg'
            name='$200'
            job='0.4 ETH'
            avgEarnings='%0.2'
            totalEarnings='%4.5'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/dai.svg'
            name='Melody Macy'
            job='Marketing Analytic'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdc.svg'
            name='Max Smith'
            job='Software Enginer'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/usdt.svg'
            name='Sean Bean'
            job='Web Developer'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/zrx.svg'
            name='Brian Cox'
            job='UI/UX Designer'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/rep.svg'
            name='Mikaela Collins'
            job='Head Of Marketing'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/bat.svg'
            name='Francis Mitcham'
            job='Software Arcitect'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/uni.svg'
            name='Olivia Wild'
            job='System Admin'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/comp.svg'
            name='Neil Owen'
            job='Account Manager'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/tusd.svg'
            name='Dan Wilson'
            job='Web Desinger'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/link.svg'
            name='Emma Bold'
            job='Corporate Finance'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
            online={true}
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/mkr.svg'
            name='Ana Crown'
            job='Customer Relationship'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/aave.svg'
            name='Ana Crown'
            job='Customer Relationship'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/yfi.svg'
            name='Ana Crown'
            job='Customer Relationship'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
        <div className='col-md-6 col-xxl-3'>
          <Card3
            avatar='/media/icons/duotune/compound/sushi.svg'
            name='Ana Crown'
            job='Customer Relationship'
            avgEarnings='$14,560'
            totalEarnings='$236,400'
          />
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

const Compound: FC = () => {
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

export {Compound}
