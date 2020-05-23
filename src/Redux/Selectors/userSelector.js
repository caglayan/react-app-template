import {
  signupGoogleApi,
  signupApi,
  userSaveLocal,
  userFetchLocal,
  userRemoveLocal,
  LoginApi,
  UpdateUserApi,
  UpdateUserImageApi,
  UpdateUserPasswordApi,
  LoginGoogleApi,
} from "../../Api/userApi";
import jwtDecode from "jwt-decode";

import { updateUser, removeUser } from "../Actions/userActions";

export const startCreateUserGoogle = (profile) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      signupGoogleApi(profile)
        .then((user) => {
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const startCreateUserWebApi = (user) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      signupApi(user)
        .then((user) => {
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const startCreateUserLoginWebApi = (user) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      LoginApi(user)
        .then((user) => {
          console.log("basırılı");
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const startCreateUserLoginGoogle = (googleId) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      LoginGoogleApi(googleId)
        .then((user) => {
          console.log("basırılı");
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          console.log("fail");
          console.log(err);
          reject(err);
        });
    });
  };
};

export const startCreateUserLocal = (dispatch) => {
  const user = userFetchLocal();
  if (user) {
    var decodedToken = jwtDecode(user.token);
    const now = new Date();
    if (now.getTime() > decodedToken.exp * 1000) {
      return null;
    }
    dispatch(updateUser(user));
    return user;
  } else {
    return null;
  }
};

export const startRemoveUserLocal = (dispatch) => {
  dispatch(removeUser());
  userRemoveLocal();
};

export const updateUserWebApi = (user, token) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      UpdateUserApi(user, token)
        .then((response) => {
          dispatch(updateUser(response.user));
          userSaveLocal(response.user);
          resolve(response.Message);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
};

export const updateUserImageWebApi = (image, token) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      UpdateUserImageApi(image, token)
        .then((user) => {
          console.log("basırılı");
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          console.log("fail");
          console.log(err);
          reject(err);
        });
    });
  };
};

export const updateUserPasswordWebApi = (password, token) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
      UpdateUserPasswordApi(password, token)
        .then((user) => {
          dispatch(updateUser(user));
          userSaveLocal(user);
          resolve(user);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
};
