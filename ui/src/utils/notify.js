let toast = null;

function setToaster(toaster) {
  toast = toaster;
}

function error(msg) {
  toast.add({ severity: 'error', ...msg });
}

function warn(msg) {
  toast.add({ severity: 'info', ...msg });
}

function info(msg) {
  toast.add({ severity: 'success', ...msg });
}

export default {
  setToaster, error, warn, info,
};
