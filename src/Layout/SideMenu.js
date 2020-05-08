import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sideMenu: {}
}));

const SideMenu = (props) => {
  const classes = useStyles();

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.close();
  };

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
        <List>
          <ListItem component={NavLink} to="/user" button key="11">
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
              secondary={props.email ? props.email : "bilinmiyor"}
            />
          </ListItem>
          <ListItem component={NavLink} to="/" button key="12">
            <ListItemText primary="Dersim" />
          </ListItem>
          <ListItem component={NavLink} to="/user/account" button key="13">
            <ListItemText primary="Hesabım" />
          </ListItem>
          <Divider />
          <ListItem component={NavLink} to="/help" button key="14">
            <ListItemText primary="Yardım" />
          </ListItem>
          <ListItem onClick={props.logoutUser} button key="15">
            <ListItemText primary="Çıkış" />
          </ListItem>
        </List>
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
    email: state.userReducer.email
  };
})(SideMenu);

export default SideMenuCon;
