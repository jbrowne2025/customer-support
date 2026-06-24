import { Icon } from '../lib/icons.jsx';

const TITLES = {
  dashboard: 'Dashboard',
  log: 'Log a meal',
  lookup: 'Ingredient lookup',
  history: 'Meal history',
  plans: 'Meal plans',
  profile: 'Health profile',
  tips: 'Tips & education',
};
const SUBS = {
  dashboard: "Today's overview",
  log: 'Photo scan or manual entry',
  lookup: 'Search any food or ingredient',
  history: 'All logged meals',
  plans: 'Weekly recommendations',
  profile: 'Your health details',
  tips: 'Learn about cholesterol',
};

export default function TopBar({ active, onProfile }) {
  return (
    <div className="bg-white border-b border-black/10 px-4 pt-3.5 pb-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-lg bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56]">
          <Icon name="heart" size={17} />
        </div>
        <div>
          <div className="text-[15px] font-medium">{TITLES[active] || active}</div>
          <div className="text-xs text-gray-500">{SUBS[active] || ''}</div>
        </div>
      </div>
      <button
        onClick={onProfile}
        aria-label="Profile"
        className="border-none bg-none p-1.5 text-gray-500 cursor-pointer"
      >
        <Icon name="user" size={22} />
      </button>
    </div>
  );
}
