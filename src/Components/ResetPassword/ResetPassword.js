import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress, Grid } from "@material-ui/core";
import ResetPasswordForm from "./ResetPasswordForm";
import { SendPasswordMailApi } from "../../Api/userApi";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Container: {
    background: "#fff",
    borderRadius: "10px",
  },
  GoogleButton: {
    margin: theme.spacing(3),
  },
  SignupButton: {
    margin: theme.spacing(1),
  },
}));

function ResetPassword(props) {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (email) => {
    setProgressVisible(true);
    console.log(email);
    SendPasswordMailApi(email)
      .then((message) => {
        setProgressVisible(false);
        props.showMessages(1, message);
        history.push(`/`);
      })
      .catch((err) => {
        setProgressVisible(false);
        console.log(err);
        props.showMessages(2, err);
      });
  };

  return (
    <Container className={classes.Container} maxWidth="sm">
      <img style={{ width: "100%" }} src="/login_art.jpg"></img>
      {progressVisible ? (
        <LinearProgress variant="query" color="secondary" />
      ) : null}
      <Grid container direction="row" justify="center" alignItems="center">
        <ResetPasswordForm onSubmit={onSubmit} />
      </Grid>
    </Container>
  );
}

export default ResetPassword;
