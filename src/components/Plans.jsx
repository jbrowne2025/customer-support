import { Icon } from '../lib/icons.jsx';
import { Card } from '../lib/ui.jsx';

export default function Plans() {
  return (
    <div className="px-4 pt-3.5 pb-21">
      <div className="text-center py-12 px-5">
        <Icon name="salad" size={44} className="text-[#9FE1CB] block mx-auto mb-3" />
        <h3 className="text-base font-medium mb-1.5">Meal plans — coming soon</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Personalised weekly meal plans based on your cholesterol targets and health profile will appear here.
        </p>
      </div>
      <Card title="Quick tips for now">
        <Tip icon="grain" head="Eat more fibre" text="Oats, beans, lentils, and fruit help lower LDL naturally." />
        <Tip icon="droplet" head="Choose healthy fats" text="Swap butter for olive oil, avocado, and nuts to raise HDL." />
        <Tip icon="ban" head="Limit processed foods" text="Trans fats raise LDL and lower HDL simultaneously." last />
      </Card>
    </div>
  );
}

function Tip({ icon, head, text, last }) {
  return (
    <div className={`p-3 px-3.5 rounded-xl bg-gray-50 ${last ? '' : 'mb-2'}`}>
      <div className="text-[13px] font-medium mb-1 flex items-center gap-1.5">
        <Icon name={icon} size={16} className="text-emerald-600" /> {head}
      </div>
      <p className="text-[13px] text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}
