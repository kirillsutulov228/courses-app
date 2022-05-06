const { BaseError } = require('sequelize');
const { ValidationError } = require('yup');

function handleYupValidationError(err, req, res, next) {
  if (!res.headersSent && err instanceof ValidationError ) {
    const errorResponse = {};
    const fields = err.inner.length ? err.inner : [err];
    console.log(err);
    for (const field of fields) {
      errorResponse[field.path] = { value: field.params.value ?? null, error: field.message }
    }
    return res.status(400).json(errorResponse);
  }
  next(err);
}

function handleSequelizeError(err, req, res, next) {
  if (!res.headersSent && err instanceof BaseError) {
    const errorResponse = {};
    for (const field of err.errors) {
      errorResponse[field.path] = { value: field.value ?? null, error: field.message }
    }
    return res.status(409).json(errorResponse);
  }
  next(err);
}

function handleOtherErrors(err, req, res, next) {
  console.log(err);
  if (!res.headersSent) {
    return res.sendStatus(500);
  }
  next(err);
}

module.exports = {
  handleYupValidationError,
  handleSequelizeError,
  handleOtherErrors
};
