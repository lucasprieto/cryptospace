import { useRef, useEffect } from 'react'

function usePrevious (value, initialValue) {
    const ref = useRef(initialValue)
    useEffect(() => {
        ref.current = value
    });
    return ref.current
}

export default usePrevious