const { ZodError } = require('zod');

const PARTS = { body: 'body', query: 'query', params: 'params' };

function validate(schema, part = PARTS.body) {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req[part]);
      req.valid = req.valid || {};
      req.valid[part] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) return next(err);
      return next(err);
    }
  };
}

function validateAll({ body, query, params } = {}) {
  return (req, _res, next) => {
    try {
      req.valid = req.valid || {};
      if (body) req.valid.body = body.parse(req.body);
      if (query) req.valid.query = query.parse(req.query);
      if (params) req.valid.params = params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) return next(err);
      return next(err);
    }
  };
}

module.exports = { validate, validateAll, PARTS };
