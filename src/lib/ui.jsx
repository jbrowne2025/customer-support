import { Icon } from './icons.jsx';

export function LevelBadge({ level }) {
  const cls =
    level === 'high' ? 'bg-[#FCEBEB] text-[#791F1F]' :
    level === 'medium' || level === 'med' ? 'bg-[#FAEEDA] text-[#633806]' :
    'bg-[#E1F5EE] text-[#085041]';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[11px] font-medium whitespace-nowrap ${cls}`}>
      {level}
    </span>
  );
}

export function RiskPill({ risk }) {
  const cls =
    risk === 'high' ? 'bg-[#FCEBEB] text-[#791F1F]' :
    risk === 'medium' ? 'bg-[#FAEEDA] text-[#633806]' :
    'bg-[#E1F5EE] text-[#085041]';
  const iconKey = risk === 'high' ? 'alert' : risk === 'medium' ? 'alertcircle' : 'circlecheck';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
      <Icon name={iconKey} size={12} /> {risk} risk
    </span>
  );
}

export function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white border border-black/10 rounded-xl p-4 mb-3 ${className}`}>
      {title && <div className="text-[13px] text-gray-500 mb-3">{title}</div>}
      {children}
    </div>
  );
}

export function Button({ children, onClick, variant = 'default', size = 'md', full = false, className = '', type = 'button', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-1.5 rounded-lg border font-sans cursor-pointer transition active:opacity-80 whitespace-nowrap';
  const sizeCls = size === 'sm' ? 'px-3 py-[7px] text-[13px]' : 'px-4 py-2.5 text-sm';
  const variantCls =
    variant === 'primary'
      ? 'bg-emerald-600 text-white border-emerald-600 active:bg-emerald-700'
      : 'bg-transparent text-gray-900 border-black/25';
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizeCls} ${variantCls} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export const inputCls =
  'w-full px-3 py-2.5 border border-black/25 rounded-lg text-sm bg-white text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15';

export function AiLoading({ text }) {
  return (
    <div className="flex items-center gap-2 p-3.5 text-[13px] text-gray-500 bg-gray-50 rounded-lg mt-2.5">
      <Icon name="loader" size={18} className="text-emerald-600 animate-spin" /> {text}
    </div>
  );
}

export function AiError({ text }) {
  return (
    <div className="flex items-center gap-2 p-3.5 text-[13px] text-red-700 bg-gray-50 rounded-lg mt-2.5">
      <Icon name="alertcircle" size={18} /> {text}
    </div>
  );
}
