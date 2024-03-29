import { toAbsoluteUrl } from "src/_metronic/helpers";



const BorrowApy = ({ borrowApy, compBorrowApy, hasEntered }) => {
    return (
        <div
            className={`border border-gray-${hasEntered ? '400' : '300'
                } border-dashed rounded min-w-100px py-1 px-1 mb-3`}
        >
            {compBorrowApy ? (
                <div className='fs-7 fw-bolder text-gray-700'>
                    {borrowApy}%+ {compBorrowApy}%
                    {
                        <img
                            className='mx-1'
                            alt='Pic'
                            width='20px'
                            src={toAbsoluteUrl('/media/icons/duotune/compound/COMP.svg')}
                        />
                    }
                </div>
            ) : (
                <div className='fs-7 fw-bolder text-gray-700'>{borrowApy}%</div>
            )}
            <div className='fw-bold text-gray-400'>Borrow APY</div>
        </div>
    )
}

export default BorrowApy;
