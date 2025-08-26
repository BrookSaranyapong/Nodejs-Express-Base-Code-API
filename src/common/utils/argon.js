// utils/argon.js
const argon2 = require('argon2');

class ArgonService {
  constructor(options = {}) {
    this.options = {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
      ...options,
    };
  }

  hashPassword = async (plain) => {
    return argon2.hash(plain, this.options);
  };

  verifyPassword = async (plain, hash) => {
    return argon2.verify(hash, plain);
  };
}

module.exports = ArgonService;
