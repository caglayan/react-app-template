import React from "react";
import { Formik } from "formik";
import { Container, TextField, Grid, Box, Button } from "@material-ui/core";

const Basic = (props) => (
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

      if (!values.givenName) {
        errors.givenName = "First Name is required.";
      }

      if (!values.familyName) {
        errors.familyName = "Last Name is required.";
      }

      if (!values.password) {
        errors.password = "Password is required.";
      } else if (values.password.length < 6) {
        errors.password = "Password must be longer than 5 characters.";
      }

      console.log(errors);
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
      <Container maxWidth="sm">
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Grid container justify="center" item spacing={3}>
            <Grid item xs={6}>
              <TextField
                error={errors.givenName != null && touched.givenName}
                label="First Name"
                fullWidth
                name="givenName"
                id="givenName"
                helperText={
                  errors.givenName && touched.givenName && errors.givenName
                }
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.givenName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.familyName != null && touched.familyName}
                label="Last Name"
                fullWidth
                name="familyName"
                id="familyName"
                helperText={
                  errors.familyName && touched.familyName && errors.familyName
                }
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.familyName}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" item spacing={3}>
            <Grid item xs={6}>
              <TextField
                error={errors.email != null && touched.email}
                label="Email Address"
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

            <Grid item xs={6}>
              <TextField
                error={errors.password != null && touched.password}
                label="Create Password"
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
          </Grid>
          <Grid item style={{ marginTop: "15px" }} xs={12}>
            <Box textAlign="left" m={0}>
              By signing up you agree to Kiraz's Terms of Service and Privacy
              Policy. This page is protected by reCAPTCHA and is subject to
              Google's Terms of Service and Privacy Policy.
            </Box>
          </Grid>
          <Grid item style={{ marginTop: "15px" }} xs={12}>
            <Box textAlign="center" m={0}>
              <Button
                style={{ width: "100%", height: "42px" }}
                onClick={props.closeDialog}
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  errors.password ||
                  errors.email ||
                  errors.givenName ||
                  errors.familyName
                }
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
        </form>
      </Container>
    )}
  </Formik>
);

export default Basic;
