import React from "react";
import "./BodyArea.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ResetPassPage from "./Pages/ResetPassPage";
import CreatePassPage from "./Pages/CreatePassPage";
import AccountPage from "../Account/Account";
import CoursePage from "../Course/CourseMain";
import { startCreateUserLocal } from "./../Redux/Selectors/userSelector";

function BodyArea(propsGeneral) {
  var checkLogin = () => {
    if (propsGeneral._id) {
      console.log("user logged in before");
      return true;
    } else {
      if (startCreateUserLocal(propsGeneral.dispatch)) {
        console.log("user logged in now");
        return true;
      } else {
        console.log("user is not logged in");
        return false;
      }
    }
  };

  return (
    <div className="container">
      <Switch>
        <Route
          path="/course/:id"
          render={(props) => (
            <CoursePage {...props} showMessages={propsGeneral.showMessages} />
          )}
        />
        <Route
          path="/user/"
          render={(props) =>
            checkLogin() ? (
              <AccountPage
                {...props}
                showMessages={propsGeneral.showMessages}
              />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          path="/reset-password/:token"
          render={(props) => (
            <CreatePassPage
              {...props}
              showMessages={propsGeneral.showMessages}
            />
          )}
        />
        <Route
          path="/signin"
          exact={true}
          render={(props) => (
            <SignInPage {...props} showMessages={propsGeneral.showMessages} />
          )}
        />
        <Route
          path="/signup"
          exact={true}
          render={(props) => (
            <SignUpPage {...props} showMessages={propsGeneral.showMessages} />
          )}
        />
        <Route
          path="/reset-password"
          exact={true}
          render={(props) => (
            <ResetPassPage
              {...props}
              showMessages={propsGeneral.showMessages}
            />
          )}
        />
        <Route
          path="/"
          exact={true}
          render={(props) => (
            <SignInPage {...props} showMessages={propsGeneral.showMessages} />
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default connect((state) => {
  return {
    _id: state.userReducer._id,
  };
})(BodyArea);
