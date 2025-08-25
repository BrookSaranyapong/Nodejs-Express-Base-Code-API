// === helpers ===
const signAccess = (payload) => {
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
};
const signRefresh = (payload) => {
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
};
const verifyAccess = (t) => {
  jwt.verify(t, ACCESS_SECRET);
};
const verifyRefresh = (t) => {
  jwt.verify(t, REFRESH_SECRET);
};
const sha256 = (s) => {
  createHash('sha256').update(s).digest('hex');
};

module.exports = {
  signAccess,
  signRefresh,
  verifyAccess,
  verifyRefresh,
  sha256,
};
