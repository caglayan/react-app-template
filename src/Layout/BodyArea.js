import React from "react";
import { Switch, Route } from "react-router-dom";
import CourseMain from "../CourseLanding/CourseMain";
import Profile from "../Profile/Account";
import CheckoutContainer from "../ShoppingComponents/CheckoutContainer";
import NotFoundPage from "./NotFoundPage";

const routes = (
  <Switch>
    <Route path="/" component={CourseMain} exact={true} />
    <Route path="/user/account" component={Profile} exact={true} />
    <Route path="/user/avatar" component={Profile} exact={true} />
    <Route path="/user/password" component={Profile} exact={true} />
    <Route
      path="/user/shoppingcart"
      component={CheckoutContainer}
      exact={true}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default function BodyArea() {
  return routes;
}
