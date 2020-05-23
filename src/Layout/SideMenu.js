import React from "react";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(2),
    },
  },
  menuMobile: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const SideMenu = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.close();
  };
  const mobileOptimizedMenu = (
    <List className={classes.menuMobile}>
      <ListItem component={NavLink} to="/user/account" button key="11">
        <ListItemAvatar>
          <Avatar
            onClick={props.sideMenuOpen}
            className={classes.Avatar}
            alt={props.givenName + " " + props.familyName}
            src={props.avatarImage ? props.avatarImage.dataUri : null}
          >
            {props.givenName ? props.givenName.charAt(0).toUpperCase() : null}
            {props.familyName ? props.familyName.charAt(0).toUpperCase() : null}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            props.givenName
              ? props.givenName + " " + props.familyName
              : "Problem"
          }
          secondary={props.email ? props.email : "Problem"}
        />
      </ListItem>
      <ListItem component={NavLink} to="/user/account" button key="13">
        <ListItemText primary="Your Account" />
      </ListItem>
      <ListItem component={NavLink} to="/user/avatar" button key="14">
        <ListItemText primary="Your Avatar" />
      </ListItem>
      <ListItem component={NavLink} to="/user/password" button key="15">
        <ListItemText primary="Your Password" />
      </ListItem>
      <Divider />
      <ListItem component={NavLink} to="/help" button key="16">
        <ListItemText primary="Help" />
      </ListItem>
      <ListItem
        onClick={() => {
          history.push("/");
          props.logoutUser();
        }}
        button
        key="17"
      >
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
  );
  const desktopOptimizedMenu = (
    <List className={classes.menuDesktop}>
      <ListItem component={NavLink} to="/user" button key="11">
        <ListItemAvatar>
          <Avatar
            onClick={props.sideMenuOpen}
            className={classes.Avatar}
            alt={props.givenName + " " + props.familyName}
            src={props.avatarImage ? props.avatarImage.dataUri : null}
          >
            {props.givenName ? props.givenName.charAt(0).toUpperCase() : null}
            {props.familyName ? props.familyName.charAt(0).toUpperCase() : null}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            props.givenName
              ? props.givenName + " " + props.familyName
              : "Problem"
          }
          secondary={props.email ? props.email : "Problem"}
        />
      </ListItem>
      <ListItem component={NavLink} to="/user/account" button key="13">
        <ListItemText primary="Account Settings" />
      </ListItem>
      <ListItem component={NavLink} to="/premium" button key="12">
        <ListItemText primary="Buy Premium" />
      </ListItem>
      <Divider />
      <ListItem component={NavLink} to="/help" button key="14">
        <ListItemText primary="Help" />
      </ListItem>
      <ListItem onClick={props.logoutUser} button key="15">
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
  );

  return (
    <Drawer
      anchor="right"
      open={props.isOpen}
      onClose={toggleDrawer("right", false)}
    >
      <div
        className={classes.sideMenu}
        role="presentation"
        onClick={toggleDrawer(props.type, false)}
        onKeyDown={toggleDrawer(props.type, false)}
      >
        {desktopOptimizedMenu}
        {mobileOptimizedMenu}
      </div>
    </Drawer>
  );
};

SideMenu.propTypes = {};

const SideMenuCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImage: state.userReducer.avatarImage,
    email: state.userReducer.email,
  };
})(SideMenu);

export default SideMenuCon;
