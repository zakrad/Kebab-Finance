/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useAccount} from 'src/app/modules/web3'
import {BigNumber, ethers} from 'ethers'
import {AppService} from '../../../../app/modules/services/covalent.service'

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
      time: Date
      timestamp: number
      to: string
      transactionIndex: number
      type: number
      value: {_hex: string; _isBigNumber: boolean}
    }>
  >([])
  let historical: any[] = []

  // const appService = new AppService()

  const etherscanProvider = new ethers.providers.EtherscanProvider(
    'homestead',
    'HVP7WPKI5VGRM42W9RPDNWGTICDFTQ48HS'
  )
  const address = account.data

  // const addressTokens = async (address: string) => {
  //   const tokens = await appService.getAddressTokens(address)
  //   console.log(tokens)
  //   return tokens
  // }

  // addressTokens('0x2f877d11c8A7dccdd78F408106D126b065A4BDcF')

  useEffect(() => {
    async function getHistory(address: string) {
      await etherscanProvider.getHistory(address).then((history) => {
        history.forEach((tx) => {
          historical.push(tx)
        })
      })
      setTxs(historical.length)
      setLast(historical.slice(-10).reverse())
    }
    getHistory('0x2f877d11c8A7dccdd78F408106D126b065A4BDcF')
  }, [])

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
          {last.map((tx, i) => {
            return (
              <>
                <div className='timeline-item'>
                  <div className='timeline-label fw-bolder text-gray-800 fs-7'>
                    {new Date(tx.timestamp * 1000).toISOString().substring(5, 10).replace('-', '/')}
                  </div>
                  <div className='timeline-badge'>
                    <i
                      className={
                        'fa ' +
                        (tx.to === '0x2f877d11c8A7dccdd78F408106D126b065A4BDcF'
                          ? 'fa-arrow-circle-down text-success '
                          : 'fa-arrow-circle-up text-danger ') +
                        'fs-1'
                      }
                    ></i>
                  </div>
                  <div
                    className={
                      'fw-mormal timeline-content ps-3 ' +
                      (tx.to === '0x2f877d11c8A7dccdd78F408106D126b065A4BDcF'
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
                    {tx.from === '0x2f877d11c8A7dccdd78F408106D126b065A4BDcF'
                      ? 'you'
                      : `"${tx.from.substring(0, 7)}..."`}{' '}
                    to{' '}
                    {tx.to === '0x2f877d11c8A7dccdd78F408106D126b065A4BDcF'
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
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export {ListsWidget5}
