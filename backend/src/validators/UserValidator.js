const { object, string, ref } = require('yup')

require('yup')

const UserValidator = object({
  username: string().min(4).max(16).required(),
  email: string().email().required(),
  password: string().min(6).max(12).required(),
});

const RegisterValidator = UserValidator.shape({
  passwordConfirmation: string().oneOf([ref('password')]).required()
})

module.exports = { UserValidator, RegisterValidator };
