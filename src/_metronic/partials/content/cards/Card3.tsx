/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl, KTSVG} from '../../../helpers'

type Props = {
  color?: string
  avatar?: string
  online?: boolean
  name: string
  job: string
  avgEarnings: string
  totalEarnings: string
}

const Card3: FC<Props> = ({
  color = '',
  avatar = '',
  online = false,
  name,
  job,
  avgEarnings,
  totalEarnings,
}) => {
  return (
    <div className='card'>
      <div className='card-body d-flex flex-column p-5'>
        <div className='d-flex mb-4'>
          <div className='mb-5'>
            <div className='symbol symbol-50px symbol-circle'>
              {color ? (
                <span className={`symbol-label bg-light-${color} text-${color} fs-5 fw-bolder`}>
                  {name.charAt(0)}
                </span>
              ) : (
                <img alt='Pic' src={toAbsoluteUrl(avatar)} />
              )}
              {online && (
                <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n3 mt-n3'></div>
              )}
            </div>
          </div>
          <div>
            <a href='#' className='fs-3 text-gray-800 text-hover-primary fw-bolder mb-0 mx-3'>
              {name}
            </a>

            <div className='fs-5 fw-bold text-gray-400 mb-6 mx-3'>{job}</div>
          </div>
        </div>
        <div className='d-flex flex-center flex-wrap my-0'>
          <div className='border border-gray-300 border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{avgEarnings}</div>
            <div className='fw-bold text-gray-400'>Supply APY</div>
          </div>

          <div className='border border-gray-300 border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{totalEarnings}</div>
            <div className='fw-bold text-gray-400'>Borrow APY</div>
          </div>
        </div>
        <div className='d-flex flex-center flex-wrap mb-5'>
          <div className='border border-gray-300 border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{avgEarnings}</div>
            <div className='fw-bold text-gray-400'>Supply APY</div>
          </div>

          <div className='border border-gray-300 border-dashed rounded min-w-100px py-1 mx-1 px-2 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700'>{totalEarnings}</div>
            <div className='fw-bold text-gray-400'>Borrow APY</div>
          </div>
        </div>
        <div className='d-flex'>
          <a href='#' className='btn btn-sm btn-light d-flex mx-2'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Supply
          </a>
          <a href='#' className='btn btn-sm btn-light d-flex mx-2'>
            <KTSVG path='/media/icons/duotune/arrows/arr090.svg' className='svg-icon-3' />
            Borrow
          </a>
        </div>
      </div>
    </div>
  )
}

export {Card3}
