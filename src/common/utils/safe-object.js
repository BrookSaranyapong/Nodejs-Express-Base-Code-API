function _getSafeObject(fn = () => ({}), defaultValue = {}) {
  try {
    const result = fn();
    return result ? { ...result } : defaultValue;
  } catch {
    return defaultValue;
  }
}

module.exports = { _getSafeObject };
