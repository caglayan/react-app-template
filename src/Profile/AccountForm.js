import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateUserWebApi } from "../Redux/Selectors/userSelector";

const useStyles = makeStyles((theme) => ({}));

const AccountForm = (props) => {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  console.log("Hey");
  console.log(props.givenName);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        givenName: props.givenName,
        familyName: props.familyName,
        email: props.email,
        password: props.password
      }}
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
        const { givenName, familyName } = values;
        const updateData = {
          givenName,
          familyName
        };
        console.log(updateData);
        props
          .dispatch(updateUserWebApi(updateData, props.token))
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
          <Typography variant="h5">Profil Bilgilerini Güncelle</Typography>
          <Typography variant="subtitle2">
            Profil bilgilerinizi güncelleyebilirsiniz.
          </Typography>
          <Grid
            container
            style={{ marginTop: "10px" }}
            justify="center"
            item
            spacing={6}
          >
            <Grid item xs={6}>
              <TextField
                label="İsim"
                fullWidth
                name="givenName"
                id="givenName"
                helperText=""
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.givenName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Soyisim"
                fullWidth
                name="familyName"
                id="familyName"
                helperText=""
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.familyName}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" item spacing={6}>
            <Grid item xs={12}>
              <TextField
                error={errors.email != null && touched.email}
                label="Email"
                fullWidth
                disabled="true"
                id="email"
                helperText={errors.email && touched.email && errors.email}
                margin="dense"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
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
              >
                {isSubmitting && <CircularProgress size={18} />}
                {!isSubmitting && "Güncelle"}
              </Button>
            </Box>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const AccountFormCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImageUrl: state.userReducer.avatarImageUrl,
    email: state.userReducer.email,
    token: state.userReducer.token
  };
})(AccountForm);

export default AccountFormCon;
