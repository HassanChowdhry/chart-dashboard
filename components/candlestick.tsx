/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, CandlestickController, CandlestickElement, TimeScale, TimeSeriesScale);

const CandlestickChart = ({ data }: { data: any }) => {
  if (!data) return <p className="text-center text-gray-50 text-xl">Loading...</p>;

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        offset: true,
      },
      y: {
        type: 'linear',
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const item = tooltipItems[0];
            return `Date: ${item.label}`;
          },
          label: (tooltipItem: any) => {
            const { o, h, l, c } = tooltipItem.raw;
            return `O: ${o}, H: ${h}, L: ${l}, C: ${c}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Candlestick Chart</h2>
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
};

export default CandlestickChart;
