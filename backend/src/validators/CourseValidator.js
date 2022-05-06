const { object, string, number } = require('yup');

const CourseValidator = object({
  authorId: number().required(),
  name: string().required(),
});

const SubscribeOnCourseValidator = object({
  userId: number().required(),
  courseId: number().required(),
})

module.exports = {
  CourseValidator,
  SubscribeOnCourseValidator
}
