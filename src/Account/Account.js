import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { connect } from "react-redux";
import AccountForm from "./AccountForm";
import AvatarForm from "./AvatarForm";
import PasswordForm from "./PasswordForm";
import { startRemoveUserLocal } from "../Redux/Selectors/userSelector";

const useStyles = makeStyles((theme) => ({
  containerDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  containerMobile: {
    marginTop: 50,
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  Avatar: {
    margin: "auto",
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 100,
  },
  List: {
    maxWidth: 200,
    margin: "auto",
  },
  ListItemActive: {
    backgroundColor: theme.palette.action.selected,
  },
}));
const Account = (props) => {
  const classes = useStyles();
  const logoutUser = () => {
    console.log("user logout");
    startRemoveUserLocal(props.dispatch);
    props.history.push("/");
  };

  const desktopOptimizedAccount = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.containerDesktop}
    >
      <Grid item xs={4}>
        <List
          className={classes.List}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <ListItemAvatar>
                <Avatar
                  onClick={props.sideMenuOpen}
                  className={classes.Avatar}
                  alt={props.givenName + " " + props.familyName}
                  src={props.avatarImage ? props.avatarImage.dataUri : null}
                >
                  {props.givenName
                    ? props.givenName.charAt(0).toUpperCase()
                    : null}
                  {props.familyName
                    ? props.familyName.charAt(0).toUpperCase()
                    : null}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ textAlign: "center", marginBottom: "20px" }}
                primary={
                  props.givenName
                    ? props.givenName + " " + props.familyName
                    : "unknown"
                }
              ></ListItemText>
            </ListSubheader>
          }
        >
          <ListItem
            component={NavLink}
            exact
            to="/user/account"
            activeClassName={classes.ListItemActive}
            button
            key="account"
          >
            <ListItemText primary="Your Profile" />
          </ListItem>
          <ListItem
            component={NavLink}
            exact
            to="/user/avatar"
            activeClassName={classes.ListItemActive}
            button
            key="avatar"
          >
            <ListItemText primary="Your Avatar" />
          </ListItem>
          <ListItem
            component={NavLink}
            exact
            to="/user/password"
            activeClassName={classes.ListItemActive}
            button
            key="password"
          >
            <ListItemText primary="Password" />
          </ListItem>
          <ListItem onClick={logoutUser} button key="25">
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={8}>
        <Switch>
          <Route
            path="/user/account"
            exact={true}
            render={(prop) => (
              <AccountForm {...prop} showMessages={props.showMessages} />
            )}
          />
          <Route
            path="/user/avatar"
            exact={true}
            render={(prop) => (
              <AvatarForm {...prop} showMessages={props.showMessages} />
            )}
          />
          <Route
            path="/user/password"
            exact={true}
            render={(prop) => (
              <PasswordForm {...prop} showMessages={props.showMessages} />
            )}
          />
        </Switch>
      </Grid>
    </Grid>
  );

  const mobileOptimizedAccount = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.containerMobile}
    >
      <Grid item xs={12}>
        <Switch>
          <Route
            path="/user/account"
            exact={true}
            render={(prop) => (
              <AccountForm {...prop} showMessages={props.showMessages} />
            )}
          />
          <Route
            path="/user/avatar"
            exact={true}
            render={(prop) => (
              <AvatarForm {...prop} showMessages={props.showMessages} />
            )}
          />
          <Route
            path="/user/password"
            exact={true}
            render={(prop) => (
              <PasswordForm {...prop} showMessages={props.showMessages} />
            )}
          />
        </Switch>
      </Grid>
    </Grid>
  );

  return (
    <Container className={classes.container} maxWidth="md">
      {/* Desktop */}
      {desktopOptimizedAccount}
      {mobileOptimizedAccount}
    </Container>
  );
};

const AccountCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImage: state.userReducer.avatarImage,
    email: state.userReducer.email,
  };
})(Account);

export default AccountCon;
