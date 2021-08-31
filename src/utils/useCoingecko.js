import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import Coingecko from 'coingecko-api';
import useSWR from 'swr';
import moment from 'moment';

const CoingeckoContext = createContext();
CoingeckoContext.displayName = 'Coingecko';

function CoingeckoProvider({ children }) {
  const CoinGeckoClient = useMemo(() => new Coingecko(), []);
  const [list, setList] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await CoinGeckoClient.coins.list();
      setList(result.data);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <CoingeckoContext.Provider value={{ coingecko: CoinGeckoClient, list }}>{children}</CoingeckoContext.Provider>;
}

function useCoingecko() {
  const { coingecko, list } = useContext(CoingeckoContext);
  return [coingecko, list];
}

function useCoingeckoOhlc(ticker, options = { days: 1, currency: 'usd' }) {
  const { days, currency } = options;
  const url = `${ticker}/ohlc?vs_currency=${currency}&days=${days}`;
  const fetcher = t => fetch(`https://api.coingecko.com/api/v3/coins/${t}`).then(res => res.json());

  const expireMiddleware = next => {
    return (key, fet, config) => {
      const { cache } = config;
      if (cache.has(key)) {
        const cached = cache.get(key);
        const error = cache.get(`$err$${key}`);
        if (!error) {
          const lastUpdated = cached[cached.length - 1][0];
          if (moment.utc(lastUpdated).add(30, 'minutes') >= moment.utc()) {
            return next(key, () => Promise.resolve(cached), config);
          }
        }
      }
      return next(key, fet, config);
    };
  };

  const { error, data } = useSWR(url, fetcher, {
    dedupingInterval: 5000,
    errorRetryInterval: 1000,
    use: [expireMiddleware],
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export { useCoingecko };
export { useCoingeckoOhlc };
export { CoingeckoProvider };

export default useCoingecko;
