import axios from "axios";
import ls from "local-storage";

const url = "http://localhost:4000";

export const courseFetchLocal = () => {
  return ls.get("course");
};

export const courseSaveLocal = (course) => {
  return ls.set("course", course);
};

export const courseRemoveLocal = (course) => {
  return ls.remove("course");
};

export const findPublicCourseWithId = (_id) => {
  console.log("Find Course Api");
  const apiString = url + "/api/course/unauth/find";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        _id
      })
      .then((res) => {
        console.log(res.data.course);
        resolve(res.data.course);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
