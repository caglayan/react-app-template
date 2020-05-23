import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button, Divider, Box, LinearProgress, Grid } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import {
  startCreateUserLoginGoogle,
  startCreateUserLoginWebApi,
} from "../../Redux/Selectors/userSelector";
import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) => ({
  GoogleButton: {
    margin: theme.spacing(3),
  },
  SignupButton: {
    margin: theme.spacing(1),
  },
}));

function LoginDialogContent(props) {
  const API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const responseGoogle = (response) => {
    // var profile = response.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log("Full Name: " + profile.getName());
    // console.log("Given Name: " + profile.getGivenName());
    // console.log("Family Name: " + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());
    // console.log(response.getAuthResponse().id_token);
    props
      .dispatch(startCreateUserLoginGoogle(response.getAuthResponse().id_token))
      .then((user) => {
        if (props.closeDialog) {
          props.closeDialog();
        }
        setProgressVisible(false);
        history.push(`/`);
      })
      .catch((err) => {
        setProgressVisible(false);
        props.showMessages(2, err);
      });
  };

  const onSubmit = (formValues) => {
    setProgressVisible(true);
    props
      .dispatch(startCreateUserLoginWebApi(formValues))
      .then((user) => {
        if (props.closeDialog) {
          props.closeDialog();
        }
        setProgressVisible(false);
        history.push(`/`);
      })
      .catch((err) => {
        setProgressVisible(false);
        props.showMessages(2, err);
      });
  };

  return (
    <div>
      <img style={{ width: "100%" }} src="/login_art.jpg"></img>
      {progressVisible ? (
        <LinearProgress variant="query" color="secondary" />
      ) : null}
      <Grid container justify="center">
        <GoogleLogin
          onRequest={(e) => {
            setProgressVisible(true);
          }}
          clientId={API_KEY}
          buttonText="Log in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          className={classes.GoogleButton}
        />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={5}>
            <Divider />
          </Grid>
          <Grid item xs={2}>
            <Box textAlign="center" m={1}>
              or
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Divider />
          </Grid>
          <SignInForm onSubmit={onSubmit} />
          <Button
            className={classes.SignupButton}
            onClick={() => {
              if (props.closeDialog) {
                props.signUpOpen();
              } else {
                history.push(`/signup`);
              }
            }}
          >
            Not a member yet? Sign up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect()(LoginDialogContent);
