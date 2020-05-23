import React from "react";
import { Formik } from "formik";
import { Box, Button, TextField, Grid, Link } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

const Basic = (props) => {
  //const history = useHistory();
  return (
    <Formik
      initialValues={{ givenName: "", familyName: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email is required.";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Incorrect email.";
        }

        if (!values.password) {
          errors.password = "Password is required.";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values);
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
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Grid container justify="center" item>
            <Grid item xs={10}>
              <TextField
                error={errors.email != null && touched.email}
                label="Email"
                fullWidth
                id="email"
                helperText={errors.email && touched.email && errors.email}
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                error={errors.password != null && touched.password}
                label="Password"
                type="password"
                fullWidth
                id="password"
                helperText={
                  errors.password && touched.password && errors.password
                }
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Grid>
            <Grid item xs={10}>
              <Link
                target="_blank"
                href="/reset-password"
                variant="body1"
                color="primary"
              >
                Forgot Password?
              </Link>
              {/* <Button
                onClick={() => {
                  history.push(`/reset-password`);
                  props.closeDialog();
                }}
              >
                Forgot Password?
              </Button> */}
            </Grid>
            <Grid item style={{ marginTop: "15px" }} xs={10}>
              <Box textAlign="center" m={0}>
                <Button
                  style={{ width: "100%" }}
                  onClick={props.closeDialog}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    errors.password
                      ? true
                      : false || errors.email
                      ? true
                      : false
                  }
                >
                  Sign in
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default Basic;
