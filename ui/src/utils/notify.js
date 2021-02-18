let toast = null;

function setToaster(toaster) {
  toast = toaster;
}

function error(msg) {
  toast.add({ life: 5000, severity: 'error', ...msg });
}

function warn(msg) {
  toast.add({ life: 5000, severity: 'warn', ...msg });
}

function info(msg) {
  toast.add({ life: 5000, severity: 'info', ...msg });
}

function success(msg) {
  toast.add({ life: 5000, severity: 'success', ...msg });
}

export default {
  setToaster, error, warn, info, success,
};
