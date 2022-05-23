const { Router } = require('express');
const withPaginate = require('../middlewares/withPaginate.js');
const sendOne = require('../middlewares/sendOne.js');
const { User, Course } = require('../models/models.js');
const { CourseValidator, SubscribeOnCourseValidator } = require('../validators/CourseValidator.js');

const courseRouter = Router();

courseRouter.get('/courses', withPaginate(async ({ offset, limit }) => {
  return [
    await Course.findAll({ offset, limit }),
    await Course.count()
  ];
}));

courseRouter.get('/users/:id/createdCourses', withPaginate(async ({ req, res, offset, limit }) => {
  const user = await User.findByPk(req.params.id);
  console.log(user);
  if (!user) {
    return res.sendStatus(404);
  }
  return [
    await user.getCreatedCourses({ offset, limit }),
    (await user.getCreatedCourses()).length
  ];
}));

courseRouter.get('/users/:id/subscribedCourses', withPaginate(async ({ req, res, offset, limit }) => {
  const user = await User.findByPk(req.params.id);
  console.log(user);
  if (!user) {
    return res.sendStatus(404);
  }
  return [
    await user.getSubscribedCourses({ offset, limit }),
    (await user.getSubscribedCourses()).length
  ];
}));

courseRouter.get('/courses/:id', sendOne(async ({ req }) => {
  return await Course.findByPk(req.params.id);
}));

courseRouter.post('/auth/user/createdCourses', async (req, res, next) => {
  try {
    const data = { authorId: req.user.id, ...req.body }
    await CourseValidator.validate(data, { abortEarly: false });
    await Course.create(data);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

courseRouter.delete('/auth/user/createdCourses/:id', async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    await SubscribeOnCourseValidator.validate({ courseId, userId });
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);
  
    if (!user) {
      return res.status(404).json({ id: { value: userId, error: 'user not found' } });
    }
    if (!course) {
      return res.status(404).json({ id: { value: courseId, error: 'course not found' } });
    }
    
    await user.removeCreatedCourse(course);
    await course.destroy();
    return res.sendStatus(200);

  } catch (err) {
    next(err);
  }
});

courseRouter.post('/auth/user/subscribedCourses/:id', async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    await SubscribeOnCourseValidator.validate({ courseId, userId });
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);
  
    if (!user) {
      return res.status(404).json({ id: { value: userId, error: 'user not found' } });
    }
    if (!course) {
      return res.status(404).json({ id: { value: courseId, error: 'course not found' } });
    }
    
    await user.addSubscribedCourse(course);
    return res.sendStatus(200);

  } catch (err) {
    next(err);
  }
});

courseRouter.delete('/auth/user/subscribedCourses/:id', async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;
    await SubscribeOnCourseValidator.validate({ courseId, userId });
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);
  
    if (!user) {
      return res.status(404).json({ id: { value: userId, error: 'user not found' } });
    }
    if (!course) {
      return res.status(404).json({ id: { value: courseId, error: 'course not found' } });
    }
    
    await user.removeSubscribedCourse(course);
    return res.sendStatus(200);

  } catch (err) {
    next(err);
  }
});


module.exports = courseRouter;
