exports.ok = function ok(req, res) {
  res.status(200).json({ status: 'ok' });
};
