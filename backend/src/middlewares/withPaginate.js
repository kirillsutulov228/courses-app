const PaginationValidator = require('../validators/PaginationValidator.js');

function withPaginate(resultCallback, paginateOptions = { defaultLimit: 20, maxLimit: 100 }) {
  return async function(req, res, next) {
    try {
      let page = +(req.query.page ?? 1);
      let limit = +(req.query.limit ?? paginateOptions.defaultLimit);
      await PaginationValidator.validate({ page, limit }, { abortEarly: false });
      if (limit > paginateOptions.maxLimit) {
        limit = paginateOptions.maxLimit;
      }
      const offset = (page - 1) * limit;
      let  [result, total = null] = await resultCallback({ req, res, next, offset, limit });
      if (!res.headersSent) {
        return res.json({ result, page, limit, total });
      }
    } catch(err) {
      return next(err);
    }
  }
}

module.exports = withPaginate;
