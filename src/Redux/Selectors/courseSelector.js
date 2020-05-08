import {
  findPublicCourseWithId,
  courseSaveLocal,
  courseRemoveLocal,
  courseFetchLocal
} from "../../Api/courseApi";

import { updateCourse, removeCourse } from "../Actions/courseActions";

export const startCreatePublicCourse = (_id) => {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
      findPublicCourseWithId(_id)
        .then((course) => {
          dispatch(updateCourse(course));
          resolve(course);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
};

export const startCreatePublicCourseLocal = (dispatch) => {
  const course = courseFetchLocal();
  if (course) {
    dispatch(updateCourse(course));
    return course;
  } else {
    return null;
  }
};

export const startRemovePublicCourseLocal = (dispatch) => {
  dispatch(removeCourse());
  courseRemoveLocal();
};
