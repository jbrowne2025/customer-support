import { Icon } from '../lib/icons.jsx';
import { Card } from '../lib/ui.jsx';

export default function Tips() {
  return (
    <div className="px-4 pt-3.5 pb-21">
      <Card title="Understanding cholesterol">
        <TipRow icon="arrowdown" head="LDL — the bad kind" text="Builds up in artery walls, raising risk of heart disease. Target below 100 mg/dL." />
        <TipRow icon="arrowup" head="HDL — the good kind" text="Carries cholesterol away from arteries. Higher is better — aim above 40 mg/dL." />
        <TipRow icon="dot" head="Total cholesterol" text="Desirable below 200 mg/dL. Borderline high: 200–239. High: 240+." last />
      </Card>
      <Card title="Daily serving guides">
        <InfoLine k="Eggs" v="Max 4–6/week (at-risk: 3)" />
        <InfoLine k="Red meat" v="85g, 1–2× per week" />
        <InfoLine k="Full-fat dairy" v="1 serving/day max" />
        <InfoLine k="Shellfish" v="85–115g, 2× per week" />
        <InfoLine k="Butter" v="Max 1 tsp/day" last />
      </Card>
      <Card title="Lifestyle factors">
        <TipRow icon="run" head="Exercise" text="30 min moderate activity 5×/week raises HDL and lowers LDL." />
        <TipRow icon="smoke" head="Smoking" text="Quitting can raise HDL by up to 10% within weeks." />
        <TipRow icon="glass" head="Alcohol" text="Moderate intake may raise HDL; excess raises triglycerides and risk." last />
      </Card>
    </div>
  );
}

function TipRow({ icon, head, text, last }) {
  return (
    <div className={`p-3 px-3.5 rounded-xl bg-gray-50 ${last ? '' : 'mb-2'}`}>
      <div className="text-[13px] font-medium mb-1 flex items-center gap-1.5">
        <Icon name={icon} size={16} className="text-emerald-600" /> {head}
      </div>
      <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}

function InfoLine({ k, v, last }) {
  return (
    <div className={`flex justify-between items-baseline py-2.5 gap-2 text-sm ${last ? '' : 'border-b border-black/5'}`}>
      <span className="text-gray-500">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}
