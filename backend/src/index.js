require('dotenv').config();
require('./models/models.js');

const express = require('express');
const sequelize = require('./models/sequelize.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter.js');
const authRouter = require('./routers/authRouter.js');
const {
  handleYupValidationError,
  handleSequelizeError,
  handleOtherErrors
} = require('./middlewares/errorMiddlewares.js');
const courseRouter = require('./routers/courseRouter.js');

const { PORT, HOST, CORS_ORIGIN, COOKIE_SECRET } = process.env;

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('public'),
  cors({ credentials: true, origin: CORS_ORIGIN }),
  cookieParser(COOKIE_SECRET)
);

app.use(
  userRouter,
  authRouter,
  courseRouter
);

app.use(
  handleYupValidationError,
  handleSequelizeError,
  handleOtherErrors
);

sequelize
  .sync()
  .then(() => app.listen(+PORT, HOST))
  .then(() => console.log(`Server listening on http://${HOST}:${PORT}`))
  .catch(console.error);

