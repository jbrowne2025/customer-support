import { useState } from 'react';
import TopBar from './components/TopBar.jsx';
import BottomNav from './components/BottomNav.jsx';
import Dashboard from './components/Dashboard.jsx';
import LogMeal from './components/LogMeal.jsx';
import Lookup from './components/Lookup.jsx';
import History from './components/History.jsx';
import Plans from './components/Plans.jsx';
import Profile from './components/Profile.jsx';
import Tips from './components/Tips.jsx';

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [meals, setMeals] = useState([]);
  const [weekly, setWeekly] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [profile, setProfile] = useState({});
  const [limit, setLimit] = useState(200);
  const [conditions, setConditions] = useState([]);

  function logMeal(meal) {
    setMeals((prev) => [meal, ...prev]);
    setWeekly((prev) => {
      const day = new Date().getDay();
      const next = [...prev];
      next[day] = (next[day] || 0) + meal.totalCholesterol_mg;
      return next;
    });
  }

  return (
    <div className="max-w-[430px] mx-auto bg-[#f5f5f2] min-h-screen text-[15px] text-gray-900 leading-relaxed">
      <h2 className="sr-only">Cholesterol meal tracker</h2>
      <TopBar active={tab} onProfile={() => setTab('profile')} />

      {tab === 'dashboard' && <Dashboard meals={meals} profile={profile} limit={limit} weekly={weekly} onNavigate={setTab} />}
      {tab === 'log' && <LogMeal conditions={conditions} limit={limit} onLogMeal={logMeal} onDone={() => setTab('history')} />}
      {tab === 'lookup' && <Lookup conditions={conditions} limit={limit} />}
      {tab === 'history' && <History meals={meals} />}
      {tab === 'plans' && <Plans />}
      {tab === 'profile' && (
        <Profile profile={profile} setProfile={setProfile} limit={limit} setLimit={setLimit} conditions={conditions} setConditions={setConditions} />
      )}
      {tab === 'tips' && <Tips />}

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
