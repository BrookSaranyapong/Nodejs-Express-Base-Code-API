const { z } = require('zod');

exports.RegisterSchema = z
  .object({
    email: z.string().email().max(255).trim(),
    password: z.string().min(8).max(128).trim(),
    name: z.string().min(1).max(100).trim(),
  })
  .strict();
