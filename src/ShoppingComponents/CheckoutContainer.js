import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import AddressForm from "./AddressForm";
import ShoppingCart from "./ShoppingCart";
import ShoppingProgress from "./ShoppingProgress";

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
      <Grid container xs={12} spacing={6}>
        <Grid item xs={6} spacing={2}>
          <ShoppingProgress></ShoppingProgress>
          <AddressForm></AddressForm>
        </Grid>
        <Grid item xs={6} spacing={2}>
          <ShoppingCart></ShoppingCart>
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
