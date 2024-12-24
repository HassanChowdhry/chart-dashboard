import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchChartData } from '@/redux/slices/chart';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import CandlestickChart from '@/components/candlestick';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { candlestick, line, bar, pie } = useAppSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  if (!line || !bar || !pie) {
    return <p className="text-center text-gray-50 text-xl">Loading...</p>;
  }

  const lineChartData = {
    labels: line.labels,
    datasets: [
      {
        label: 'Line Chart',
        data: line.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels: bar.labels,
    datasets: [
      {
        label: 'Bar Chart',
        data: bar.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: pie.labels,
    datasets: [
      {
        label: 'Pie Chart',
        data: pie.data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const candlestickData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: candlestick.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-200">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CandlestickChart data={candlestickData}/>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Line Chart</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Bar Chart</h2>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Pie Chart</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
