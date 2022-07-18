import { toAbsoluteUrl } from "src/_metronic/helpers";



const SupplyApy = ({supplyApy, compSupplyApy, hasEntered}) => {
    return (
        <div
            className={`border border-gray-${hasEntered ? '400' : '300'
                } border-dashed rounded min-w-100px py-1 mx-1 px-1 mb-3`}
        >
            {compSupplyApy ? (
                <div className='fs-7 fw-bolder text-gray-700'>
                    {supplyApy}% + {compSupplyApy}%
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
                <div className='fs-7 fw-bolder text-gray-700'>{supplyApy}%</div>
            )}
            <div className='fw-bold text-gray-400'>Supply APY</div>
        </div>
    )
}

export default SupplyApy;
