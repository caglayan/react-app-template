import React from "react";
import jwtDecode from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { LinearProgress, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CreatePasswordForm from "./CreatePasswordForm";
import { updateUserPasswordWebApi } from "../../Redux/Selectors/userSelector";

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

function CreatePassword(props) {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  if (props.match.params.token) {
    try {
      var decodedToken = jwtDecode(props.match.params.token);
    } catch (error) {
      console.log(error);
      history.push(`/`);
    }
  } else {
    history.push(`/`);
  }

  const onSubmit = (password) => {
    setProgressVisible(true);
    console.log(password);

    props
      .dispatch(updateUserPasswordWebApi(password, props.match.params.token))
      .then((user) => {
        setProgressVisible(false);
        console.log(user);
        history.push(`/`);
      })
      .catch((err) => {
        setProgressVisible(false);
        console.log(err);
        props.onError(err);
      });
  };

  return (
    <div>
      <img style={{ width: "100%" }} src="/login_art.jpg"></img>
      {progressVisible ? (
        <LinearProgress variant="query" color="secondary" />
      ) : null}
      <Grid container direction="row" justify="center" alignItems="center">
        <CreatePasswordForm onSubmit={onSubmit} />
      </Grid>
    </div>
  );
}

export default connect()(CreatePassword);
