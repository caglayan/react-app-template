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
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    minHeight: "54vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3)
    }
  },
  Avatar: {
    width: 100,
    height: 100
  },
  ListItemActive: {
    backgroundColor: theme.palette.action.selected
  }
}));
const Account = (props) => {
  const classes = useStyles();

  const logoutUser = () => {
    console.log("user logout");
    startRemoveUserLocal(props.dispatch);
    props.history.push("/");
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container xs={12} spacing={2}>
        <Grid container justify="center" xs={4} spacing={2}>
          <List
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
                  primary={
                    props.givenName
                      ? props.givenName + " " + props.familyName
                      : "bilinmiyor"
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
              <ListItemText primary="Hesabım" />
            </ListItem>
            <ListItem
              component={NavLink}
              exact
              to="/user/avatar"
              activeClassName={classes.ListItemActive}
              button
              key="avatar"
            >
              <ListItemText primary="Profil Resmi" />
            </ListItem>
            <ListItem
              component={NavLink}
              exact
              to="/user/password"
              activeClassName={classes.ListItemActive}
              button
              key="password"
            >
              <ListItemText primary="Şifremi değiştir" />
            </ListItem>
            <ListItem onClick={logoutUser} button key="25">
              <ListItemText primary="Çıkış" />
            </ListItem>
          </List>
        </Grid>
        <Grid container alignItems="center" xs={8} spacing={2}>
          {props._id ? (
            <Switch>
              <Route
                path="/user/account"
                component={AccountForm}
                exact={true}
              />
              <Route path="/user/avatar" component={AvatarForm} exact={true} />
              <Route
                path="/user/password"
                component={PasswordForm}
                exact={true}
              />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const AccountCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImage: state.userReducer.avatarImage,
    email: state.userReducer.email
  };
})(Account);

export default AccountCon;
