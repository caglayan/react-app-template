import axios from "axios";
import ls from "local-storage";

const url = "http://localhost:4000";

export const userFetchLocal = () => {
  return ls.get("user");
};

export const userSaveLocal = (user) => {
  return ls.set("user", user);
};

export const userRemoveLocal = (user) => {
  return ls.remove("user");
};

export const signupGoogleApi = (profile, token) => {
  console.log("Signup Api");
  const apiString = url + "/api/user/unauth/create";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        email: profile.getEmail(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        avatarImage: {
          dataUri: profile.getImageUrl()
        },
        googleId: profile.getId()
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signupApi = (user) => {
  console.log("Signup Api");
  const apiString = url + "/api/user/unauth/create";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        email: user.email,
        givenName: user.givenName,
        familyName: user.familyName,
        password: user.password
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const LoginApi = (user) => {
  console.log("Login Api");
  const apiString = url + "/api/user/unauth/auth";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        email: user.email,
        password: user.password
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const LoginGoogleApi = (googleId) => {
  console.log("Login Api");
  const apiString = url + "/api/user/unauth/authgoogle";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        googleId
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const UpdateUserApi = (user, token) => {
  console.log("Update Api");
  console.log(user);
  const apiString = url + "/api/user/auth/update";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, user, {
        headers: { "x-api-key": token }
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const UpdateUserImageApi = (imagefile, token) => {
  console.log("Update Api");
  console.log(imagefile);
  var formData = new FormData();
  formData.append("image", imagefile);
  const apiString = url + "/api/user/auth/uploadimage";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, formData, {
        headers: { "x-api-key": token, "Content-Type": "multipart/form-data" }
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const UpdateUserPasswordApi = (password, token) => {
  console.log("Update Password Api");
  const apiString = url + "/api/user/unauth/updatePass";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, password, {
        headers: { "x-api-key": token }
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
