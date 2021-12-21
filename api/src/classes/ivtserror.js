/* eslint-disable no-template-curly-in-string */
// The error list contains a bunch of curlys in strings.

const iErrorList = {
  IE1: { status: 422, detail: 'Een resource(${0} ${1}) kan niet gevonden worden.' },
  IE2: { status: 422, detail: 'Het etiket(${0}) is al in gebruik.' },
  IE3: { status: 400, detail: 'De oproep was incorrect.' },
  IE4: { status: 400, detail: 'Het artikel kon niet gevonden worden.' },
  IE5: { status: 409, detail: 'Er bevond zich een nieuwe versie van het artikel in de databank.' },
  IE6: { status: 400, detail: 'De voorgestelde wijzigingen zijn niet consistent.' },
  IE7: { status: 500, detail: 'UNUSED ERROR' },
  IE8: { status: 200, detail: 'Het artikel werd succesvol gewijzigd' },
  IE9: { status: 200, detail: 'Het artikel werd in de vuilbak geplaatst.' },
  IE10: { status: 200, detail: 'Het artikel werd uit de vuilbak gehaald.' },
  IE11: { status: 400, detail: 'De gevraagde operatie is onbekend.' },
  IE12: { status: 200, detail: 'Het artikel zat al in de vuilbak.' },
  IE13: { status: 200, detail: 'Het artikel zat al niet meer in de vuilbak' },
  IE14: { status: 400, detail: 'Bad request: geen actie opgegeven.' },
  IE15: { status: 404, detail: 'Onbekend request' },
  IE16: { status: 400, detail: 'Een verplicht veld(${0}) mist in de oproep of is leeg.' },
  IE17: { status: 400, detail: 'De waarde van een van de velden(${0}) voldoet niet aan de voorwaarden.' },
  IE18: { status: 400, detail: 'De request bevatte geen gegevens.' },
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

  externalize() {
    const msg = this;
    delete msg.name;
    return msg;
  }

  get status() {
    return iErrorList[this.code].status;
  }
};
