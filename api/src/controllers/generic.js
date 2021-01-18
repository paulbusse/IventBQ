exports.ok = function(req, res) {
  console.log('GET /OK');
  res.status(200).json( {status: 'ok'});
};