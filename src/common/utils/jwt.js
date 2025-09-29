const { CONFIG } = require('../constants/config');

const signAccess = (payload) => {
  jwt.sign(payload, CONFIG.ACCESS_SECRET, { expiresIn: CONFIG.ACCESS_TTL });
};
const signRefresh = (payload) => {
  jwt.sign(payload, CONFIG.REFRESH_SECRET, { expiresIn: CONFIG.REFRESH_TTL });
};
const verifyAccess = (t) => {
  jwt.verify(t, CONFIG.ACCESS_SECRET);
};
const verifyRefresh = (t) => {
  jwt.verify(t, CONFIG.REFRESH_SECRET);
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
