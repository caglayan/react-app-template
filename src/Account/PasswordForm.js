import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateUserPasswordWebApi } from "../Redux/Selectors/userSelector";
import LensIcon from "@material-ui/icons/Lens";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Container,
  CircularProgress,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({}));

const PasswordForm = (props) => {
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        pass1: "",
        pass2: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.pass1) {
          errors.pass1 = "This is required.";
        } else if (values.pass1.length < 6) {
          errors.pass1 = "This must be longer than 5 characters.";
        }

        if (!values.pass2) {
          errors.pass2 = "This is required.";
        } else if (values.pass2.localeCompare(values.pass1)) {
          errors.pass2 = "Passwords are not equal.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        const password = {
          password: values.pass1,
        };
        props
          .dispatch(updateUserPasswordWebApi(password, props.token))
          .then((user) => {
            setSubmitting(false);
            props.showMessages(1, "Your password is updated.");
          })
          .catch((err) => {
            setSubmitting(false);
            props.showMessages(2, err);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Container maxWidth="sm">
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Typography variant="h5">Change Password</Typography>
            <Typography variant="subtitle2">
              <List dense={true}>
                In order to protect your account, make sure your password:
                <ListItem>
                  <ListItemIcon>
                    <LensIcon style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  Is longer than 5 characters.
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LensIcon style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  Does not match or significantly contain your username.
                </ListItem>
              </List>
            </Typography>
            <Grid
              container
              style={{ marginTop: "10px" }}
              justify="center"
              item
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  error={errors.pass1 != null && touched.pass1}
                  helperText={errors.pass1 && touched.pass1 && errors.pass1}
                  label="New Password"
                  fullWidth
                  name="pass1"
                  type="password"
                  id="pass1"
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pass1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.pass2 != null && touched.pass2}
                  helperText={errors.pass2 && touched.pass2 && errors.pass2}
                  label="Re-enter Your New Password"
                  fullWidth
                  name="pass2"
                  id="pass2"
                  type="password"
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pass2}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: "25px" }} xs={12}>
              <Box textAlign="center" m={0}>
                <Button
                  style={{ width: "100%" }}
                  onClick={props.closeDialog}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    errors.pass1 ? true : false || errors.pass2 ? true : false
                  }
                >
                  {isSubmitting && <CircularProgress size={18} />}
                  {!isSubmitting && "Change Password"}
                </Button>
              </Box>
            </Grid>
          </form>
        </Container>
      )}
    </Formik>
  );
};

const PasswordFormCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    password: state.userReducer.password,
    token: state.userReducer.token,
  };
})(PasswordForm);

export default PasswordFormCon;
