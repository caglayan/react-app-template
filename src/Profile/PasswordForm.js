import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateUserPasswordWebApi } from "../Redux/Selectors/userSelector";

const useStyles = makeStyles((theme) => ({}));

const PasswordForm = (props) => {
  const classes = useStyles();
  console.log("Hey");
  console.log(props.givenName);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        pass1: "",
        pass2: ""
      }}
      validate={(values) => {
        const errors = {};
        if (!values.pass1) {
          errors.pass1 = "Doldurulması zorunludur.";
        } else if (values.pass1.length < 5) {
          errors.pass1 = "Şifre uzunluğu 6 karakterden fazla olmalıdır.";
        }
        if (!values.pass2) {
          errors.pass2 = "Doldurulması zorunludur.";
        } else if (values.pass2.localeCompare(values.pass1)) {
          errors.pass2 = "Şifreler eşleşmiyor.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Hey");
        console.log(values);
        const password = {
          password: values.pass1
        };
        props
          .dispatch(updateUserPasswordWebApi(password, props.token))
          .then((user) => {
            //props.closeDialog();
            setSubmitting(false);
          })
          .catch((err) => {
            setSubmitting(false);
            //props.onError("Bir hata meydana geldi.");
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
        isSubmitting
        /* and other goodies */
      }) => (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Typography variant="h5">Şifre Değiştir</Typography>
          <Typography variant="subtitle2">
            Şifrenizi değiştirebilirsiniz.
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
                label="Şifre"
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
                label="Şifrenizi tekrar yazınız"
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
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Güncelle
              </Button>
            </Box>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const PasswordFormCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    password: state.userReducer.password,
    token: state.userReducer.token
  };
})(PasswordForm);

export default PasswordFormCon;
