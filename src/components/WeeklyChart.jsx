import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function WeeklyChart({ weekly, limit }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const data = {
    labels: days,
    datasets: [
      {
        data: weekly,
        backgroundColor: weekly.map((v) => (v > limit ? '#F09595' : v > limit * 0.7 ? '#FAC775' : '#5DCAA5')),
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => c.parsed.y + 'mg' } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, maxTicksLimit: 4 } },
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    },
  };
  return (
    <div className="h-[130px] relative mt-1">
      <Bar data={data} options={options} />
    </div>
  );
}
