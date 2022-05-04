const { object, number } = require('yup')


const PaginationValidator = object({
  page: number().min(1).required(),
  limit: number().min(0).max(20).required()
});

module.exports = PaginationValidator;
