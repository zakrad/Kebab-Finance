/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'

const ProfileHeader: React.FC = () => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded bg-primary text-white min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr037.svg'
                        className='svg-icon-3x svg-icon-white me-2'
                      />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>

                    <div className='fw-bold fs-6 text-white'>Lend Value</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-info text-white min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr036.svg'
                        className='svg-icon-3x svg-icon-white me-2'
                      />
                      <div className='fs-2 fw-bolder'>$75</div>
                    </div>

                    <div className='fw-bold fs-6 text-white'>Borrowed Value</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-light-success min-w-125px w-200px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <img
                        className='mx-1'
                        alt='Pic'
                        width='30px'
                        src={toAbsoluteUrl('/media/icons/duotune/compound/comp.svg')}
                      />
                      <div className='fs-2 fw-bolder'>2.6</div>
                      <a href='#' className='btn btn-success btn-sm mx-10'>
                        <div className='fs-7 fw-bolder'>Claim</div>
                      </a>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Comp Rewards</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Liquidation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded bg-light-primary min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/ecommerce/ecm011.svg'
                        className='svg-icon-3x svg-icon-primary me-2'
                      />
                      <div className='fs-2 fw-bolder'>0.1%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Net Apy</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-light-warning min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/finance/fin010.svg'
                        className='svg-icon-3x svg-icon-warning me-2'
                      />
                      <div className='fs-2 fw-bolder'>$75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Liquidation Price</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded bg-light-dark min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/finance/fin002.svg'
                        className='svg-icon-3x svg-icon-dark me-2'
                      />
                      <div className='fs-2 fw-bolder'>$1200</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Left to Borrow</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Debt / Collateral</span>
                  <span className='fw-bolder fs-6'>80%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '80%'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}
