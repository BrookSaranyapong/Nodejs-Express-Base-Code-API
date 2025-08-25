const argon2 = require("argon2");

const ARGON_OPTS = {
  type: argon2.argon2id, // use Argon2id
  memoryCost: 19456, // ~19MB; raise to 64MB+ if you can
  timeCost: 2, // iterations
  parallelism: 1, // threads
};
const hashPassword = (plain) => argon2.hash(plain, ARGON_OPTS);
const verifyPassword = (plain, hash) => argon2.verify(hash, plain);


module.exports = { hashPassword,verifyPassword }
