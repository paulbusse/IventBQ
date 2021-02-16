function simple() {
  return Date.now().toString(36);
}

let simpleRunInit = Date.now();

function simpleRun() {
  simpleRunInit += 1;
  return simpleRunInit.toString(36);
}

module.exports = { simple, simpleRun };
