import {FC, useEffect, useState} from 'react'
type Props = {
  name: string
  collectionName: string
  collectionTokenId: string
  collectionAddress: string
  description: string
  traits: []
}
const DetailsButton: FC<Props> = ({
  name,
  collectionName,
  collectionTokenId,
  collectionAddress,
  description,
  traits = [],
}) => {
  const [traitss, setTraitss] = useState<any[]>([])
  useEffect(() => {
    setTraitss(traits)
  }, [])
  console.log(traits)
  return (
    <div
      className='rounded-bottom modal fade'
      tabIndex={-1}
      id={'kt_modal_nft_des' + collectionTokenId}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-body'>
            <div className='tab-content ' id='myTabContent'>
              <div className='ttext-hover-inverse-secondary bg-hover-secondary p-3 rounded'>
                Name &nbsp; : &nbsp; <b>{name}</b>
              </div>
              <div className='ttext-hover-inverse-secondary bg-hover-secondary p-3 rounded'>
                Token ID &nbsp; : &nbsp; <b>{collectionTokenId}</b>
              </div>
              <div className='ttext-hover-inverse-secondary bg-hover-secondary p-3 rounded'>
                Collection Name &nbsp; : &nbsp; <b>{collectionName}</b>
              </div>
              <div className='ttext-hover-inverse-secondary bg-hover-secondary p-3 rounded'>
                Collection Address &nbsp; : &nbsp; <b>{collectionAddress}</b>
              </div>
              <div className='ttext-hover-inverse-secondary bg-hover-secondary p-3 rounded text-justify'>
                Description &nbsp; : &nbsp; {description}
              </div>

              <div className='align-items-center fs-4'>
                Traits : &nbsp;
                {traitss.map((trait) => {
                  return (
                    <button className='btn btn-bg-dark btn-color-secondary p-2 m-1 '>
                      {trait.value} : &nbsp;
                      <button className='btn btn-bg-light btn-color-gray-900 p-1'>
                        {trait.trait_type}
                      </button>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='modal-footer justify-content-between'>
            <div>
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

export default DetailsButton
