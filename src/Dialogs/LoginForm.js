import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Basic = (props) => (
  <Formik
    initialValues={{ givenName: "", familyName: "", email: "", password: "" }}
    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Doldurulması zorunludur.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Doğru bir email adresi değil gibi.";
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
      isSubmitting
      /* and other goodies */
    }) => (
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container justify="center" item spacing={1}>
          <Grid item xs={8}>
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
          <Grid item xs={8}>
            <TextField
              error={errors.password != null}
              label="Şifre"
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
          <Grid item xs={8}>
            Şifrenizi mi unuttunuz?
          </Grid>
          <Grid item style={{ marginTop: "15px" }} xs={8}>
            <Box textAlign="center" m={0}>
              <Button
                style={{ width: "100%" }}
                onClick={props.closeDialog}
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Giriş Yap
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    )}
  </Formik>
);

export default Basic;
