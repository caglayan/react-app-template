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

export const signupGoogleApi = (googleIdToken) => {
  console.log("Signup Api");
  const apiString = url + "/api/user/unauth/signupgoogle";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        googleIdToken,
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const signupApi = (user) => {
  console.log("Signup Api");
  const apiString = url + "/api/user/unauth/signup";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        email: user.email,
        givenName: user.givenName,
        familyName: user.familyName,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const LoginApi = (user) => {
  console.log("Login Api");
  const apiString = url + "/api/user/unauth/signin";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const LoginGoogleApi = (googleIdToken) => {
  console.log("Login Api");
  const apiString = url + "/api/user/unauth/signwithgoogle";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, {
        googleIdToken,
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const UpdateUserApi = (user, token) => {
  const apiString = url + "/api/user/auth/update";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, user, {
        headers: { "x-api-key": token },
      })
      .then((res) => {
        console.log(res.data.Success);
        resolve(res.data);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
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
        headers: { "x-api-key": token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const UpdateUserPasswordApi = (password, token) => {
  console.log("Update Password Api");
  const apiString = url + "/api/user/auth/updatepassword";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, password, {
        headers: { "x-api-key": token },
      })
      .then((res) => {
        console.log(res.data.user);
        resolve(res.data.user);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};

export const SendPasswordMailApi = (email) => {
  console.log("Update Password Api");
  const apiString = url + "/api/user/unauth/resetpassword";
  return new Promise((resolve, reject) => {
    axios
      .post(apiString, email)
      .then((res) => {
        console.log(res.data.Message);
        resolve(res.data.Message);
      })
      .catch((err) => {
        err.response
          ? reject(err.response.data.Message)
          : reject("No connection to our machines");
        err.response
          ? console.log("Error Code:", err.response.data.Code)
          : console.log("No internet connection or database problem");
      });
  });
};
