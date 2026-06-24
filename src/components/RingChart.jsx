import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function RingChart({ pct }) {
  const color = pct > 90 ? '#E24B4A' : pct > 70 ? '#EF9F27' : '#1D9E75';
  const data = {
    datasets: [
      {
        data: [pct, 100 - pct],
        backgroundColor: [color, 'rgba(0,0,0,0.06)'],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };
  const options = {
    cutout: '72%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { duration: 400 },
  };
  return (
    <div className="relative w-20 h-20 shrink-0">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[13px] font-medium leading-tight">
        <strong>{pct}%</strong>
        <span className="text-[10px] text-gray-500 font-normal">used</span>
      </div>
    </div>
  );
}
