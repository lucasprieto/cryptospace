import React from 'react'
import { Avatar } from '@material-ui/core'
import { useImage } from '../../utils/useImage'
import { Skeleton } from '@material-ui/lab'

function ImageAvatar({ src, chip, ...props }) {
    const { hasLoaded, hasError } = useImage(src)

    if (hasLoaded) {
        return <Avatar src={src} {...props} />
    }

    if (hasError) {
        return <Avatar {...props} />
    }
    
    return (
        <Avatar className={`${chip && 'MuiChip-avatar'}`}>
            <Skeleton variant="circle" />
        </Avatar>
    )
}

export default ImageAvatar