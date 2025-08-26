const { z } = require('./validate');

exports.refreshSchema = z
  .object({
    body: z.object({
      accessToken: z.string().min(10),
      refreshToken: z.string().min(10),
    }),
  })
  .strict();
