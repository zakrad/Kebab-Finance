/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useAccount, useNetwork} from 'src/app/modules/web3'
import {ethers} from 'ethers'

type Props = {
  className: string
}

const ListsWidget5: React.FC<Props> = ({className}) => {
  const {account} = useAccount()
  const [txs, setTxs] = useState<number | null>(null)
  const [l10, setl10] = useState<string[]>([])
  let historical: any[] = []

  const etherscanProvider = new ethers.providers.EtherscanProvider(
    'homestead',
    'HVP7WPKI5VGRM42W9RPDNWGTICDFTQ48HS'
  )
  const address = account.data

  useEffect(() => {
    async function getHistory(address: string) {
      await etherscanProvider.getHistory(address).then((history) => {
        history.forEach((tx) => {
          historical.push(tx)
        })
      })
      historical.forEach((tx) => {
        tx.time = new Date(tx.timestamp!)
      })

      setTxs(historical.length)
      const last10tx = historical.slice(-10)
      setl10(last10tx)
      console.log(l10)
    }
    getHistory('0xc39573Ba11744D76E11493793c77f3A20BB8f3e5')
  }, [])
  // const getHistory = async (address: string) => {
  //   await etherscanProvider.getHistory(address).then((history) => {
  //     history.forEach((tx) => {
  //       historical.push(tx)
  //     })
  //   })
  //   historical = historical.slice(-10)
  //   console.log(historical)
  //   return historical
  // }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Last Transactions</span>
          <span className='text-muted fw-bold fs-7'>Total {txs} Transactions</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>08:42</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-warning fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='fw-mormal timeline-content text-muted ps-3'>
              Outlines keep you honest. And keep structure
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>10:00</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Content */}
            <div className='timeline-content d-flex'>
              <span className='fw-bolder text-gray-800 ps-3'>AEOL meeting</span>
            </div>
            {/* end::Content */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>14:37</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className='timeline-content fw-bolder text-gray-800 ps-3'>
              Make deposit
              <a href='#' className='text-primary'>
                USD 700
              </a>
              . to ESL
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>16:50</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>21:03</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className='timeline-content fw-bold text-gray-800 ps-3'>
              New order placed
              <a href='#' className='text-primary'>
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>16:50</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Indulging in poorly driving and keep structure keep great
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>21:03</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className='timeline-content fw-bold text-gray-800 ps-3'>
              New order placed
              <a href='#' className='text-primary'>
                #XF-2356
              </a>
              .
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>10:30</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Finance KPI Mobile app launch preparion meeting
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export {ListsWidget5}
