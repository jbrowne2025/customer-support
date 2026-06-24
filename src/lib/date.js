export function todayStr() {
  return new Date().toLocaleDateString();
}

export function nowStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
