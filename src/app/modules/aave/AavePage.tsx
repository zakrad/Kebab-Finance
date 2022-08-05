/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useWeb3} from 'src/app/providers/web3'
import {toAbsoluteUrl} from 'src/_metronic/helpers'
import {Link, Outlet} from 'react-router-dom'

const AaveWrapper: FC = () => {
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
      <div className='d-flex flex-column flex-root'>
        <div
          className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
          style={{
            backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/progress-hd.png')}')`,
          }}
        >
          <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
            <a href='/dashboard' className='mb-10 pt-lg-20'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo-2.svg')}
                className='h-50px mb-5'
              />
            </a>
            <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Still working on it</h1>

            <div className='fw-bold fs-3 text-gray-400 mb-15'>
              Usually Work on it in my freetime! <br /> Aave with polygon support is planned
            </div>
            <div className='pt-lg-10 mb-10'>
              <Outlet />
              <div className='text-center'>
                <Link to='/' className='btn btn-lg btn-primary fw-bolder'>
                  Go to homepage
                </Link>
              </div>
            </div>
            <div
              className='
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        '
              style={{
                backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export {AaveWrapper}
