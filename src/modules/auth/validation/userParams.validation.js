const { z } = require("zod");

exports.UserIdParamsSchema = z.object({
    id: z.coerce.number().int().min(1),
  }).strict();
