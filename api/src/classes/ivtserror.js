/* eslint-disable no-template-curly-in-string */
// The error list contains a bunch of curlys in strings.

const iErrorList = {
  IE1: { detail: 'Het etiket(${0}) bestaat niet.' },
  IE2: { detail: 'Het etiket(${0}) is al in gebruik.' },
};

// Template is used in the eval below
// eslint-disable-next-line no-unused-vars
function template(strings, ...keys) {
  return (function interpolater(...values) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

function interpolate(s, ...args) {
  // Eval is safe here as the strings used are the ones in the list above.
  // eslint-disable-next-line no-eval
  const tplt = eval(`template\`${s}\``);
  return tplt(...args);
}

module.exports = class IvtsError extends Error {
  constructor(key, ...args) {
    const detail = interpolate(iErrorList[key].detail, ...args);
    super(detail);
    this.name = 'IvtsError';
    this.code = key;
    this.detail = detail;
  }
};
