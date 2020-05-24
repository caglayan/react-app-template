export const updateCourse = ({
  _id = "",
  description = "",
  abilities = [],
  title = "",
  instructor = null,
  commentPoint = 0,
  studentNumber = 0,
  levelPoint = 0,
  comments = [],
  chapters = [],
  projects = [],
  createdAt = "",
  updatedAt = "",
  duration = 0,
  isBelongMiuul = false,
  numberOfSections = 0,
  __v = 0
} = {}) => ({
  type: "UPDATE_COURSE",
  course: {
    _id,
    description,
    abilities,
    title,
    instructor,
    commentPoint,
    studentNumber,
    levelPoint,
    comments,
    chapters,
    projects,
    createdAt,
    updatedAt,
    duration,
    isBelongMiuul,
    numberOfSections
  }
});

export const removeCourse = () => ({
  type: "REMOVE_COURSE",
  course: {
    _id: "",
    name: "",
    isBelongMiuul: false
  }
});
