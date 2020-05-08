import React from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import logo from "../logo.svg";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import ShoppingCartComp from "../ShoppingComponents/ShoppingCart";
import {
  usePopupState,
  bindTrigger,
  bindPopover
} from "material-ui-popup-state/hooks";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    width: theme.spacing(16)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(20),
      width: theme.spacing(50)
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  loginButton: {
    width: theme.spacing(7),
    height: "100%"
  },
  Avatar: {
    marginLeft: 20,
    width: 50,
    height: 50
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { loginOpen, signupOpen } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={2} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  /* Not Login */

  const welcomeButtons = (
    <div className={classes.sectionDesktop}>
      <IconButton aria-label="show 1 new item in basket" color="inherit">
        <Badge
          badgeContent={props.shoppingCart ? props.shoppingCart.length : null}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Button
        style={{ marginRight: "24px", marginLeft: "24px" }}
        onClick={loginOpen}
      >
        Log in
      </Button>
      <Button
        style={{ marginTop: "6px", marginBottom: "6px" }}
        onClick={signupOpen}
        variant="contained"
      >
        Sign up
      </Button>
    </div>
  );

  /* Already Login */
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover"
  });

  const userButtons = (
    <div className={classes.sectionDesktop}>
      <IconButton
        {...bindTrigger(popupState)}
        aria-label="show 1 new item in basket"
        color="inherit"
      >
        <Badge
          badgeContent={props.shoppingCart ? props.shoppingCart.length : null}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <ShoppingCartComp></ShoppingCartComp>
      </Popover>
      <Avatar
        onClick={props.sideMenuOpen}
        className={classes.Avatar}
        alt={props.givenName + " " + props.familyName}
        src={props.avatarImage ? props.avatarImage.dataUri : null}
      >
        {props.givenName ? props.givenName.charAt(0).toUpperCase() : null}
        {props.familyName ? props.familyName.charAt(0).toUpperCase() : null}
      </Avatar>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Toolbar>
          <img src={logo} className={classes.logo} alt="logo" />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {props._id != "" ? userButtons : welcomeButtons}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {props.name}
    </div>
  );
};

const ConnectedHeader = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImage: state.userReducer.avatarImage,
    shoppingCart: state.userReducer.shoppingCart
  };
})(Header);

export default ConnectedHeader;
