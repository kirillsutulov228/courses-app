const { Router } = require('express');
const { User } = require('../models/models.js');
const Role = require('../models/tables/Role.js');
const PaginationValidator = require('../validators/PaginationValidator.js');
const { RegisterValidator } = require('../validators/UserValidator.js');

const userRouter = Router();

userRouter.post('/users', async (req, res, next) => {
  try {
    await RegisterValidator.validate(req.body, { abortEarly: false });
    await User.create(req.body);
    return res.sendStatus(201);
  } catch(err) {
    return next(err);
  }
});

userRouter.get('/users', async (req, res, next) => {
  try {
    let page = +(req.query.page ?? 1);
    let limit = +(req.query.limit ?? 10);
    await PaginationValidator.validate({ page, limit }, { abortEarly: false });
    const total = await User.count();
    const result = await User.findAll({
      include: [{ model: Role, through: { attributes: [] } }],
      offset: (page - 1) * limit,
      limit,
      attributes: { exclude: ['password', 'refreshToken'] }
    });
    return res.json({ result, page, limit, total });
  } catch(err) {
    return next(err);
  }
});

userRouter.get('/users/:id', async (req, res, next) => {
  try {
    const id = req.params.id ?? null;
    const result = await User.findByPk(id, {
      include: [{ model: Role, through: { attributes: [] } }],
      attributes: { exclude: ['password', 'refreshToken'] }
    });
    if (!result) {
      return res.sendStatus(404);
    }
    return res.json(result);
  } catch(err) {
    return next(err);
  }
});

module.exports = userRouter;
