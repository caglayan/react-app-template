import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { GoogleLogin } from "react-google-login";
import {
  startCreateUserLoginGoogle,
  startCreateUserLoginWebApi
} from "../Redux/Selectors/userSelector";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  dialog: {
    minHeight: "80vh" // 80 percent of screen height
  },
  dialogContent: {
    marginTop: 15 // 15 * 1 pixel
  }
}));

function LoginDialogContent(props) {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  const responseGoogle = (response) => {
    var profile = response.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    console.log(response.getAuthResponse().id_token);
    props
      .dispatch(startCreateUserLoginGoogle(profile.getId()))
      .then((user) => {
        props.closeDialog();
        setProgressVisible(false);
      })
      .catch((err) => {
        setProgressVisible(false);
        props.onError("Bir hata meydana geldi.");
      });
  };

  const onSubmit = (user) => {
    setProgressVisible(true);
    console.log(user);
    props
      .dispatch(startCreateUserLoginWebApi(user))
      .then((user) => {
        console.log("hahah");
        props.closeDialog();
        setProgressVisible(false);
      })
      .catch((err) => {
        setProgressVisible(false);
        props.onError("Bir hata meydana geldi.");
      });
  };

  return (
    <div>
      {progressVisible ? (
        <LinearProgress variant="query" color="secondary" />
      ) : null}
      <DialogContent className={classes.dialogContent}>
        <Grid container justify="center" spacing={2}>
          <GoogleLogin
            onRequest={(e) => {
              setProgressVisible(true);
            }}
            clientId="152160269393-ko1pdpt8sr5gdqfnhvhbon3u7sh7qpe4.apps.googleusercontent.com"
            buttonText="Google ile giriş yap"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            theme="dark"
          />
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center" m={1}>
                  veya email ile giriş yap
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
          <LoginForm onSubmit={onSubmit} />
        </Grid>
      </DialogContent>
    </div>
  );
}

export default connect()(LoginDialogContent);
