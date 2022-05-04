const { Router } = require('express');
const { User } = require('../models/models.js');
const jwt = require('jsonwebtoken');

const authRouter = Router();
const { JWT_SECRET } = process.env;

authRouter.post('/login', async (req, res) => {
  const username = req.body['username'] ?? null;
  const password = req.body['password'] ?? null;
  let user = null;

  if (username && password) {
    user = await User.findOne({ where: { username } });
    if (!user || !await user.checkPassword(password)) {
      return res.sendStatus(404);
    }
  }

  if (!user) {
    return res.sendStatus(404);
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: 900 });
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: 1296000 });
  await user.update({ refreshToken });
  res.cookie('refreshToken', refreshToken);
  return res.json({ user: { id: user.id, email: user.email, username: user.username }, accessToken });
});

authRouter.post('/refresh', async (req, res) => {
  
  let refreshToken = req.cookies['refreshToken'] ?? null;
  let user = null;

  if (refreshToken) {
    user = await User.findOne({ where: { refreshToken } });
    try {
      jwt.verify(refreshToken, JWT_SECRET);
    } catch(err) {
      if (user) {
        await user.update({ refreshToken: null });
      }
    }
  }

  if (!user) {
    return res.sendStatus(404);
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: 900 });
  refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: 1296000 });
  await user.update({ refreshToken });
  res.cookie('refreshToken', refreshToken);
  return res.json({ user: { id: user.id, email: user.email, username: user.username }, accessToken });
})

authRouter.all('/auth/**', (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization.includes('Bearer ')) {
    return res.sendStatus(401);
  }
  const accessToken = authorization.split(' ')[1];
  jwt.verify(accessToken, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    const id = decoded['id'];
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
});

authRouter.get('/auth/user', (req, res) => res.send({
  id: req.user.id,
  username: req.user.username,
  email: req.user.email,
  roles: req.user.roles,
}));

authRouter.delete('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    const user = await User.findOne({ where: { refreshToken } });
    if (user) {
      user.update({ refreshToken: null });
    }
  }
  res.clearCookie('refreshToken');
  res.sendStatus(200);
})

module.exports = authRouter;
