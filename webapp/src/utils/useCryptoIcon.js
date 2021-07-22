import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";


const CoingeckoContext = createContext()
CoingeckoContext.displayName = 'Coingecko'

/**
 * @type {import('react').Context<{}>} asd
 */
function CoingeckoProvider({ children }) {
    const [icons, setIcon]

    const requestIcon = ticker => {

    }

    return (
        <CoingeckoContext.Provider value={{ }}>
            {children}
        </CoingeckoContext.Provider>
    )
}



// Hooks
function useCryptoIcon(ticker) {
    const [icon, setIcon] = useState('loading')
    const { requestIcon, icons } = useContext(CoingeckoContext)
}


export { CoingeckoProvider }
export { useBalance }
export { useBtcPrice }

export default useCryptoIcon