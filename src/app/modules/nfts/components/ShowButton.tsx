import {FC} from 'react'
import ReactPlayer from 'react-player'
type Props = {
  name: string
  imageUrl: string
  collectionTokenId: string
}
const ShowButton: FC<Props> = ({name, imageUrl, collectionTokenId}) => {
  return (
    <div
      className='rounded-bottom modal fade'
      tabIndex={-1}
      id={'kt_modal_nft_show' + collectionTokenId}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='d-flex justify-content-center flex-row'>
            <div className='text-gray-400 fs-3 pt-3'>{name}</div>
          </div>
          <div className='modal-body'>
            {imageUrl?.includes('.mp4') ? (
              <div className='position-relative'>
                <ReactPlayer
                  url={imageUrl}
                  playing={true}
                  controls={true}
                  loop={true}
                  muted={true}
                  playsinline={true}
                  className='w-100 rounded py-0'
                />
              </div>
            ) : (
              <img src={imageUrl} alt={imageUrl} className='w-100 rounded' />
            )}
          </div>
          <div className='modal-footer justify-content-start'>
            <div className='p-0'>
              <button type='button' className='btn btn-light me-2' data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowButton
