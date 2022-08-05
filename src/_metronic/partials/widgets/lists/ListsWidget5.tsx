/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useAccount, useNetwork} from 'src/app/modules/web3'
import {BigNumber, ethers} from 'ethers'
import {AppServiceE} from '../../../../app/modules/services/etherscan.service'

type Props = {
  className: string
}

const ListsWidget5: React.FC<Props> = ({className}) => {
  const {account} = useAccount()
  const {network} = useNetwork()
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

  const appServiceE = new AppServiceE()

  useEffect(() => {
    async function getHistory(address: string) {
      await appServiceE.etherscanProvider.getHistory(address).then((history) => {
        history.forEach((tx) => {
          historical.push(tx)
        })
      })
      setTxs(historical.length)
      setLast(
        historical
          .filter((tx) => tx.value._hex !== '0x00')
          .slice(-8)
          .reverse()
      )
    }
    getHistory('0x2f877d11c8A7dccdd78F408106D126b065A4BDcF')
  }, [])

  return (
    <div
      className={`card ${className} ${
        (!account.data || !account.isInstalled || network.isLoading || account.isLoading) &&
        'overlay overlay-block'
      }`}
    >
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4 overlay-wrapper'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Last Transactions</span>
          <span className='text-muted fw-bold fs-7'>Total {txs} Transactions</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5 overlay-wrapper'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          {last.map((tx, i) => {
            return (
              <>
                <div className='timeline-item' key={i}>
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
      {!account.data && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-success'
            onClick={() => {
              account.connect()
            }}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {!account.isInstalled && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              window.open('https://metamask.io', '_blank')
            }}
          >
            Install MetaMask
          </button>
        </div>
      )}
      {(network.isLoading || account.isLoading) && (
        <div className='overlay-layer bg-dark bg-opacity-50 card-rounded'>
          <button
            type='button'
            className='btn btn-bg-light btn-active-color-muted indicator-label'
            onClick={() => {}}
          >
            Loading... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </button>
        </div>
      )}
    </div>
  )
}

export {ListsWidget5}
