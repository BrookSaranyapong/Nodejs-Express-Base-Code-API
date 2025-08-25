const { z } = require('zod');

exports.LoginSchema = z
  .object({
    email: z.string().email().max(255).trim(),
    password: z.string().min(8).max(128).trim(),
  })
  .strict();
