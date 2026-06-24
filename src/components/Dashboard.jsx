import { Icon } from '../lib/icons.jsx';
import { Button, Card } from '../lib/ui.jsx';
import RingChart from './RingChart.jsx';
import WeeklyChart from './WeeklyChart.jsx';
import { todayStr } from '../lib/date.js';

export default function Dashboard({ meals, profile, limit, weekly, onNavigate }) {
  const todays = meals.filter((m) => m.date === todayStr());
  const consumed = Math.round(todays.reduce((s, m) => s + m.totalCholesterol_mg, 0));
  const pct = Math.min(100, Math.round((consumed / limit) * 100));
  const rem = Math.max(0, limit - consumed);
  const ings = todays.flatMap((m) => m.ingredients);
  const high = ings.filter((i) => i.level === 'high').length;
  const med = ings.filter((i) => i.level === 'medium').length;
  const low = ings.filter((i) => i.level === 'low').length;

  return (
    <div className="pb-21">
      <div className="bg-white border border-black/10 rounded-xl px-4 pt-5 pb-4 m-4">
        <div className="text-[36px] font-medium leading-none -tracking-[1px]">
          {consumed} <span className="text-lg text-gray-500">mg</span>
        </div>
        <div className="text-[13px] text-gray-500 mt-1">
          of <span>{limit}</span> mg daily limit consumed
        </div>
        <div className="flex items-center gap-4 mt-4">
          <RingChart pct={pct} />
          <div className="flex-1 flex flex-col gap-2">
            <Stat color="#E24B4A" label="High items" value={high} />
            <Stat color="#EF9F27" label="Medium" value={med} />
            <Stat color="#1D9E75" label="Low" value={low} />
            <Stat color="rgba(0,0,0,.15)" label="Remaining" value={`${rem}mg`} />
          </div>
        </div>
      </div>
      <div className="px-4 mt-1">
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          <Tile label="Total chol." value={profile.total || '—'} valClass="text-[#0F6E56]" />
          <Tile label="LDL" value={profile.ldl || '—'} valClass="text-[#854F0B]" />
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          <Tile label="HDL" value={profile.hdl || '—'} valClass="text-[#0F6E56]" />
          <Tile label="Meals today" value={todays.length} valClass="text-gray-900" unit="logged" />
        </div>
        <Card title="This week">
          <WeeklyChart weekly={weekly} limit={limit} />
        </Card>
        <div className="flex gap-2 flex-wrap">
          <Button variant="primary" className="flex-1" onClick={() => onNavigate('log')}>
            <Icon name="log" size={16} /> Log meal
          </Button>
          <Button className="flex-1" onClick={() => onNavigate('lookup')}>
            <Icon name="search" size={16} /> Lookup
          </Button>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}

function Stat({ color, label, value }) {
  return (
    <div className="flex justify-between items-center text-[13px]">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full mr-1.5 shrink-0" style={{ background: color }} />
        {label}
      </div>
      <strong>{value}</strong>
    </div>
  );
}

function Tile({ label, value, valClass, unit }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-3.5">
      <div className="text-xs text-gray-500 mb-1.5">{label}</div>
      <div className={`text-[22px] font-medium -tracking-[0.5px] ${valClass}`}>{value}</div>
      {unit ? (
        <div className="text-[11px] text-gray-400 mt-0.5">{unit}</div>
      ) : (
        <div className="text-[11px] text-gray-400 mt-0.5">mg/dL</div>
      )}
    </div>
  );
}
