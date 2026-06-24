import { Icon } from '../lib/icons.jsx';
import { LevelBadge, RiskPill } from '../lib/ui.jsx';

export default function History({ meals }) {
  return (
    <div className="px-4 pt-3.5 pb-21">
      {!meals.length ? (
        <div className="text-center py-10 px-4">
          <Icon name="clipboard" size={36} className="text-black/20 block mx-auto mb-2.5" />
          <p className="text-sm text-gray-500">
            No meals logged yet.
            <br />
            Start by logging a meal.
          </p>
        </div>
      ) : (
        meals.map((m, idx) => (
          <div key={idx} className="bg-white border border-black/10 rounded-xl p-3.5 mb-2.5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[15px] font-medium">{m.mealName}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {m.date} · {m.time} · {m.totalCholesterol_mg}mg
                </div>
              </div>
              <RiskPill risk={m.riskScore} />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {m.ingredients.map((i, j) => (
                <span key={j} className="flex items-center gap-1 mr-1">
                  <LevelBadge level={i.level} />
                  <span className="text-xs">{i.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
