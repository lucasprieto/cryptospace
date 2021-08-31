import React from 'react';
import Chart from 'react-apexcharts';
import { useCoingeckoOhlc } from '../../utils/useCoingecko';

// TODO: Save candlestick data to localstorage
// TODO: Use custom cache SWR to retrieve expire at next candle
function CandlestickPlain({ ticker }) {
  const { isLoading, isError, data } = useCoingeckoOhlc(ticker);

  const chartId = `${ticker}-chart-candlestick-plain`;
  if (!isLoading && !isError) {
    return (
      <Chart
        options={{
          chart: {
            id: chartId,
            toolbar: { show: false },
            zoom: { enabled: false },
            sparkline: { enabled: true },
          },
          tooltip: { enabled: false },
        }}
        series={[{ data: data }]}
        type="candlestick"
      />
    );
  }

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  if (isError) {
    return <h4>Error</h4>;
  }
}

export default CandlestickPlain;
