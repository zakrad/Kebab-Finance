/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useAccount} from 'src/app/modules/web3'
import {BigNumber, ethers} from 'ethers'

type Props = {
  className: string
}

const ListsWidget5: React.FC<Props> = ({className}) => {
  const {account} = useAccount()
  const [txs, setTxs] = useState<number | null>(null)
  const [last, setLast] = useState<
    Array<{
      accessList: boolean
      blockHash: string
      blockNumber: number
      chainId: number
      confirmations: number
      creates: boolean
      data: string
      from: string
      gasLimit: {_hex: string; _isBigNumber: boolean}
      gasPrice: {_hex: string; _isBigNumber: boolean}
      hash: string
      nonce: number
      timestamp: number
      to: string
      transactionIndex: number
      type: number
      value: {_hex: string; _isBigNumber: boolean}
    }>
  >([])
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
      setLast(historical.slice(-10).reverse())
      // console.log(lastTx)
    }
    getHistory('0x47fA47B59276765705FC4a3640D4880F98A081fa')
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
          <span className='text-muted fw-bold fs-7'>
            Total {txs} {console.log(last)} Transactions
          </span>
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
          {last.map((tx, i) => {
            return (
              <>
                <div className='timeline-item'>
                  <div className='timeline-label fw-bolder text-gray-800 fs-6'>08:42</div>
                  <div className='timeline-badge'>
                    <i
                      className={
                        'fa ' +
                        (tx.to === '0x47fA47B59276765705FC4a3640D4880F98A081fa'
                          ? 'fa-arrow-circle-down text-success '
                          : 'fa-arrow-circle-up text-danger ') +
                        'fs-1'
                      }
                    ></i>
                  </div>
                  <div
                    className={
                      'fw-mormal timeline-content ps-3 ' +
                      (tx.to === '0x47fA47B59276765705FC4a3640D4880F98A081fa'
                        ? 'fw-bolder text-gray-800'
                        : 'text-muted')
                    }
                  >
                    {Math.round(
                      Number(
                        ethers.utils.formatEther(BigNumber.from(parseInt(tx.value._hex).toString()))
                      ) * 1e4
                    ) / 1e4}{' '}
                    Ether from{' '}
                    {tx.from === '0x47fA47B59276765705FC4a3640D4880F98A081fa'
                      ? 'you'
                      : `"${tx.from.substring(0, 7)}..."`}{' '}
                    to{' '}
                    {tx.to === '0x47fA47B59276765705FC4a3640D4880F98A081fa'
                      ? 'you'
                      : `"${tx.to.substring(0, 7)}..."`}
                  </div>
                  <a
                    href={'https://etherscan.io/tx/' + tx.hash}
                    className='text-primary'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fa fa-history text-primary fs-6'></i>
                  </a>
                </div>
              </>
            )
          })}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>14:37</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className={'fa fa-arrow-circle-down fa-arrow-circle-up text-success fs-1'}></i>
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
