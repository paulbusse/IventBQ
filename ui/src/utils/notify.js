import event from './event';

export function messenger(msg) {
  event.emit('toast', { life: 5000, ...msg });
}

export function error(msg) {
  messenger({ severity: 'error', ...msg });
}

export function warn(msg) {
  messenger({ severity: 'warn', ...msg });
}

export function info(msg) {
  messenger({ severity: 'info', ...msg });
}

export function success(msg) {
  messenger({ severity: 'success', ...msg });
}

export function plural(s, c) {
  if (c === 1) return s;
  return `${s}en`;
}

export function conjugate(s, c) {
  if (c === 1) return s;
  return `${s}en`;
}
