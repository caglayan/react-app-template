import React from "react";
import { Formik } from "formik";
import {
  TextField,
  Grid,
  Box,
  Container,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateUserWebApi } from "../Redux/Selectors/userSelector";

const useStyles = makeStyles((theme) => ({}));

const AccountForm = (props) => {
  const [progressVisible, setProgressVisible] = React.useState(false);
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        givenName: props.givenName,
        familyName: props.familyName,
        email: props.email,
      }}
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
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { givenName, familyName } = values;
        const updateData = {
          givenName,
          familyName,
        };
        props
          .dispatch(updateUserWebApi(updateData, props.token))
          .then((message) => {
            setSubmitting(false);
            props.showMessages(1, "Your profile is updated.");
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
          <form onSubmit={handleSubmit}>
            {/* <Typography variant="subtitle2">
              Profil bilgilerinizi güncelleyebilirsiniz.
            </Typography> */}
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography variant="h5">Update Your Profile</Typography>
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  error={errors.email != null && touched.email}
                  label="Email"
                  disabled
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
              <Grid item xs={12}>
                <Box textAlign="center" m={0}>
                  <Button
                    style={{ width: "100%", height: "42px" }}
                    onClick={props.closeDialog}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      errors.givenName
                        ? true
                        : false || errors.familyName
                        ? true
                        : false
                    }
                  >
                    {isSubmitting && <CircularProgress size={18} />}
                    {!isSubmitting && "Update"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
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
    token: state.userReducer.token,
  };
})(AccountForm);

export default AccountFormCon;
