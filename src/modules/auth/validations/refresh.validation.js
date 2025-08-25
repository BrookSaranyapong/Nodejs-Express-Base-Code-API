const { z } = require('./validate');

exports.refreshSchema = z
  .object({
    body: z.object({
      refreshToken: z.string().min(10),
    }),
  })
  .strict();
