import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import SignupDialogContent from "./SignupDialogContent";
import LoginDialogContent from "./LoginDialogContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  dialog: {
    minHeight: "80vh" // 80 percent of screen height
  },
  dialogContent: {
    marginTop: 15 // 15 * 1 pixel
  }
}));

function LoginSignupDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.isActive}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <img style={{ width: "100%" }} src="/banner.jpg"></img>
        {props.type == "Login" ? (
          <LoginDialogContent
            closeDialog={props.closeDialog}
            onError={props.onError}
          ></LoginDialogContent>
        ) : (
          <SignupDialogContent
            closeDialog={props.closeDialog}
            onError={props.onError}
          ></SignupDialogContent>
        )}
        {props.type == "Login" ? (
          <Grid container justify="center" spacing={0}>
            <Grid item xs={6}>
              <Box textAlign="right" m={1}>
                Üye değil misiniz?
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                value={1}
                onClick={() => {
                  props.changeType("Signup");
                }}
              >
                Üye Olun
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center" spacing={0}>
            <Grid item xs={6}>
              <Box textAlign="right" m={1}>
                Üye misiniz?
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                value={2}
                onClick={() => {
                  props.changeType("Login");
                }}
              >
                Giriş Yapın
              </Button>
            </Grid>
          </Grid>
        )}
      </Dialog>
    </div>
  );
}

export default LoginSignupDialog;
