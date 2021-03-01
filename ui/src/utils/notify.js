import event from './event';

function error(msg) {
  event.emit('toast', { life: 5000, severity: 'error', ...msg });
}

function warn(msg) {
  event.emit('toast', { life: 5000, severity: 'warn', ...msg });
}

function info(msg) {
  event.emit('toast', { life: 5000, severity: 'info', ...msg });
}

function success(msg) {
  event.emit('toast', { life: 5000, severity: 'success', ...msg });
}

export default {
  error, warn, info, success,
};
