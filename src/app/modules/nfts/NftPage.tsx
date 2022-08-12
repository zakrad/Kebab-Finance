/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useWeb3} from 'src/app/providers/web3'
import {PageTitle} from 'src/_metronic/layout/core'
import getNfts, {getTotalItem} from '../services/quicknode.js'
import Pagination from './components/Pagination'
import {NftCard} from './components/Nft'
import {useAccount} from '../web3/'

let PageSize = 12

const NftWrapper: FC = () => {
  const [nfts, setNfts] = useState<Array<any>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {account} = useAccount()
  const [length, setLength] = useState<any>(0)

  useEffect(() => {
    async function getTotalItems() {
      try {
        setLength(await getTotalItem())
      } catch (e) {
        console.log(e)
      }
    }
    getTotalItems()
  }, [])

  // const address = '0xc86B12d850FdBBF3260a7BAAE862F85857aAdBBa'

  useEffect(() => {
    async function getNft(currentPage: any) {
      try {
        setNfts(await getNfts(currentPage, account.data))
      } catch (e) {
        console.log(e)
      }
    }
    getNft(currentPage)
  }, [currentPage])

  return (
    <>
      <PageTitle children={'Your NFTs'} />
      <Pagination
        currentPage={currentPage}
        totalCount={length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />

      <div className='row'>
        {nfts.map((nft) => {
          return (
            <div className='col-lg-3 p-1 ribbon ribbon-top ribbon-vertical mt-3'>
              <div className='ribbon-label bg-active-secondary text-active-inverse-secondary active'>
                {nft.name.length > 30 ? nft.name.substring(0, 30) + '...' : nft.name}
              </div>
              <NftCard
                imageUrl={nft.imageUrl}
                name={nft.name}
                collectionName={nft.collectionName}
                collectionTokenId={nft.collectionTokenId}
                collectionAddress={nft.collectionAddress}
                description={nft.description}
                traits={nft.traits}
              />
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  )
}
const NftPage: FC = () => {
  return (
    <>
      <NftWrapper />
    </>
  )
}
export {NftPage}
