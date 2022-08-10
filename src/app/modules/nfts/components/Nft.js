import { toAbsoluteUrl } from "src/_metronic/helpers"

const NftCard = (url) => {
    return (<>
        <div className='col-lg-3 p-1'>
            <div className='card card-custom overlay overflow-hidden'>
                <div className='card-body p-4'>
                    <div className='overlay-wrapper'>
                        <img src={toAbsoluteUrl(url ? url : '/media/no-image.jpg')} alt='' className='w-100 rounded' />
                    </div>
                    <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'>
                        <div className='d-flex flex-grow-1 flex-center py-5'>
                            <a href='#' className='btn btn-primary btn-shadow'>
                                Explore
                            </a>
                            <a href='#' className='btn btn-light-primary btn-shadow ms-2'>
                                Purchase
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default NftCard