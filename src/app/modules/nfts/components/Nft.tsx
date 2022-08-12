import {FC, useState} from 'react'
import ReactPlayer from 'react-player'
import {toAbsoluteUrl} from 'src/_metronic/helpers'
import {MutatingDots} from 'react-loader-spinner'
import DetailsButton from './DetailsButton'
import ShowButton from './ShowButton'

type Props = {
  imageUrl: string
  name: string
  collectionName: string
  collectionTokenId: string
  collectionAddress: string
  description: string
  traits: []
}

const NftCard: FC<Props> = ({
  imageUrl,
  name,
  collectionName,
  collectionTokenId,
  collectionAddress,
  description,
  traits = [],
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <div className='card card-custom overlay overflow-hidden d-flex'>
        <div className='card-body p-4 align-items-center justify-content-center min-h-300px d-flex'>
          <div className='overlay-wrapper'>
            <div className='position-relative' style={{display: loading ? 'block' : 'none'}}>
              <MutatingDots
                height='100'
                width='100'
                color='#936A5B'
                radius='11'
                secondaryColor='#FCC06A'
                ariaLabel='three-dots-loading'
              />
            </div>
            {imageUrl ? (
              imageUrl.includes('.mp4') ? (
                <div className='position-relative' style={{display: loading ? 'none' : 'block'}}>
                  <ReactPlayer
                    url={toAbsoluteUrl(imageUrl)}
                    playing={true}
                    controls={true}
                    loop={true}
                    muted={true}
                    playsinline={true}
                    className='w-100 rounded py-0'
                    onReady={() => {
                      setLoading(false)
                    }}
                  />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  style={{display: loading ? 'none' : 'block'}}
                  alt={name}
                  className='w-100 rounded'
                  onLoad={() => {
                    setLoading(false)
                  }}
                />
              )
            ) : (
              <img
                src={toAbsoluteUrl('/media/no-image.jpg')}
                alt=''
                className='w-100 rounded'
                onLoad={() => {
                  setLoading(false)
                }}
                style={{display: loading ? 'none' : 'block'}}
              />
            )}
          </div>
          <div className='overlay-layer bg-dark bg-opacity-10 align-items-end justify-content-center'>
            <div className='d-flex flex-grow-1 flex-center py-5'>
              <button
                type='button'
                className='btn btn-primary btn-shadow'
                data-bs-toggle='modal'
                data-bs-target={'#kt_modal_nft_des' + collectionTokenId}
              >
                Details
              </button>
              {imageUrl ? (
                <button
                  type='button'
                  className='btn btn-light-primary btn-shadow ms-2'
                  data-bs-toggle='modal'
                  data-bs-target={'#kt_modal_nft_show' + collectionTokenId}
                >
                  Show
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <DetailsButton
        name={name}
        collectionName={collectionName}
        collectionTokenId={collectionTokenId}
        description={description}
        collectionAddress={collectionAddress}
        traits={traits}
      />
      <ShowButton name={name} imageUrl={imageUrl} collectionTokenId={collectionTokenId} />
    </>
  )
}
export {NftCard}
