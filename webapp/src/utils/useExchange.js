import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
const ftx = window.ftxapi

const FTX_KEY = process.env.REACT_APP_FTX_KEY
const FTX_SECRET = process.env.REACT_APP_FTX_SECRET

const ExchangeContext = createContext()
ExchangeContext.displayName = 'FTXExchange'

/**
 * @type {import('react').Context<{}>} asd
 */
function ExchangeProvider({ children }) {
    const ws = useRef(null)
    const [btc, setBtc] = useState(0)

    const handleUpdate = useCallback(({channel, market, data}) => {
        setBtc(data?.last)
    }, [])

    useEffect(() => {
        if (ws.current) {
            return
        }
        ws.current = new ftx.WebsocketClient({
            key: FTX_KEY,
            secret: FTX_SECRET,
            baseUrl: 'http://localhost:3004',
            requestOptions: {
                baseUrl: 'http://localhost:3004',
            },
            restOptions: {
                baseUrl: 'http://localhost:3004',
            }
            
            // subAccountName: 'sub1'
        });
        
        console.log('Created WS Instance')

        // append event listeners
        ws.current.on('response', msg => console.log('response: ', msg));
        ws.current.on('update', msg => handleUpdate(msg));
        ws.current.on('error', msg => console.log('err: ', msg));

        ws.current.subscribe({
            channel: 'ticker',
            market: 'BTC-PERP'
          });
        

        return () => {
            ws.current.close()
        }
    }, [])

    return (
        <ExchangeContext.Provider value={{ btc }}>
            {children}
        </ExchangeContext.Provider>
    )
}



// Hooks
function useExchange() {
    return useContext(ExchangeContext).exchange
}

function useBtcPrice() {
    return useContext(ExchangeContext).btc
}

async function useBalance() {
    return null
}

export { ExchangeProvider }
export { useBalance }
export { useBtcPrice }

export default useExchange