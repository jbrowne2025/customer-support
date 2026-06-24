import { Icon } from '../lib/icons.jsx';

const ITEMS = [
  { id: 'dashboard', label: 'Home', icon: 'home' },
  { id: 'log', label: 'Log', icon: 'log' },
  { id: 'lookup', label: 'Lookup', icon: 'search' },
  { id: 'history', label: 'History', icon: 'clock' },
  { id: 'plans', label: 'Plans', icon: 'salad' },
  { id: 'tips', label: 'Tips', icon: 'bulb' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      role="navigation"
      aria-label="App navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-black/10 flex pt-1.5 pb-2.5 z-50"
    >
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 bg-none border-none cursor-pointer text-[10px] py-0.5 transition-colors ${
            active === item.id ? 'text-emerald-600' : 'text-gray-400'
          }`}
        >
          <Icon name={item.icon} size={22} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
