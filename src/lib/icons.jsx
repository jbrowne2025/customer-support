const S = 'stroke-current fill-none';

export function Icon({ name, size = 16, className = '' }) {
  const path = PATHS[name] || PATHS.dot;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${S} inline-block shrink-0 ${className}`}
    >
      {path}
    </svg>
  );
}

const PATHS = {
  home: <><path d="M5 12H3l9-9 9 9h-2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" /><path d="M9 21v-6h6v6" /></>,
  log: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  salad: <><path d="M7 21h10M12 21v-4" /><ellipse cx="12" cy="11" rx="9" ry="4" /><path d="M3 11c0-2 2-4 4-5s3-1 5-1 4 0 5 1 4 3 4 5" /></>,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 016 6c0 2-1 3.5-2.5 4.5S13 15 13 16h-2c0-1-.5-1.5-2-2.5S6 11 6 9a6 6 0 016-6z" /></>,
  user: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.8A4 4 0 0110 16h4a4 4 0 013.8 2.8" /></>,
  heart: <path d="M19.5 12.6L12 20l-7.5-7.4A5 5 0 1112 6a5 5 0 117.5 6.6" />,
  camera: <><path d="M5 7h1a2 2 0 002-2 1 1 0 011-1h6a1 1 0 011 1 2 2 0 002 2h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2" /><circle cx="12" cy="13" r="3" /></>,
  pencil: <><path d="M4 20h4L18.5 9.5a2.1 2.1 0 00-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" /></>,
  sparkles: <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5z" />,
  check: <path d="M5 12l5 5L20 7" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  exchange: <path d="M7 16V4L3 8m4-4l4 4M17 8v12l4-4m-4 4l-4-4" />,
  loader: <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />,
  alert: <path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h16.9a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0zM12 9v4M12 17h.01" />,
  alertcircle: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>,
  circlecheck: <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></>,
  save: <><path d="M6 4h10l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" /><path d="M9 4v4h6V4M8 20v-6h8v6" /></>,
  grain: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="16.5" cy="7.5" r="1" /><circle cx="7.5" cy="7.5" r="1" /><circle cx="7.5" cy="16.5" r="1" /><circle cx="16.5" cy="16.5" r="1" /></>,
  droplet: <path d="M12 2s-8 8-8 13a8 8 0 0016 0c0-5-8-13-8-13z" />,
  ban: <><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>,
  run: <><circle cx="14" cy="4" r="1" /><path d="M5 21l4-4 2.5 2.5L15 15l3 4M9 17l1-5 3 3 2-8" /></>,
  smoke: <path d="M3 16h10M17 16h4M3 20h14M18 20h3M18 10c.7-.7 1-1.3 1-2a3 3 0 00-3-3M3 3l18 18" />,
  glass: <path d="M5 3h14l-4 8 4 10H5l4-10z" />,
  arrowdown: <><circle cx="12" cy="12" r="9" /><path d="M8 12l4 4 4-4M12 8v8" /></>,
  arrowup: <><circle cx="12" cy="12" r="9" /><path d="M8 12l4-4 4 4M12 16V8" /></>,
  dot: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></>,
  clipboard: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></>,
};
