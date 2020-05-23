import React from "react";
import { Formik } from "formik";
import {
  TextField,
  Grid,
  Box,
  Container,
  Button,
  Typography,
  Avatar,
  Input,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { updateUserImageWebApi } from "../Redux/Selectors/userSelector";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  Avatar: {
    width: 150,
    height: 150,
  },
}));
const AvatarForm = (props) => {
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        avatarImageUrl: !props.avatarImage
          ? "No image"
          : props.avatarImage.name,
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        props
          .dispatch(updateUserImageWebApi(values.file, props.token))
          .then((user) => {
            setSubmitting(false);
            props.showMessages(1, "Your avatar is updated.");
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
        setFieldValue,
        /* and other goodies */
      }) => (
        <Container maxWidth="sm">
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography variant="h5">Update Profile Picture</Typography>
                <Typography variant="subtitle2">
                  You can update your profile image.
                </Typography>
              </Grid>
              <Avatar
                onClick={props.sideMenuOpen}
                className={classes.Avatar}
                style={{ marginTop: "20px" }}
                alt={props.givenName + " " + props.familyName}
                src={props.avatarImage ? props.avatarImage.dataUri : null}
              >
                {props.givenName
                  ? props.givenName.charAt(0).toUpperCase()
                  : null}
                {props.familyName
                  ? props.familyName.charAt(0).toUpperCase()
                  : null}
              </Avatar>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled={true}
                  id="avatarImageUrl"
                  margin="dense"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.avatarImageUrl}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button component="label">
                          <Input
                            id="file"
                            style={{ display: "none" }}
                            name="file"
                            type="file"
                            accept="image/png, image/jpeg"
                            disableUnderline
                            onChange={(event) => {
                              console.log(event.currentTarget.files[0]);
                              setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                              setFieldValue(
                                "avatarImageUrl",
                                event.currentTarget.files[0].name
                              );
                            }}
                          />
                          Yükle
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
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

const AvatarFormCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    givenName: state.userReducer.givenName,
    familyName: state.userReducer.familyName,
    avatarImage: state.userReducer.avatarImage,
    email: state.userReducer.email,
    token: state.userReducer.token,
  };
})(AvatarForm);

export default AvatarFormCon;
