
import { useState } from "react"
import { toAbsoluteUrl } from "src/_metronic/helpers"

export const NftImage = (imageUrl) => {
    const [src, setSrc] = useState('/media/no-image.jpg')

    return (
        <img
            src={src}
            alt=''
            className='w-100 rounded'
            onLoad={async () => await setSrc(imageUrl)}
        />
    )
}
