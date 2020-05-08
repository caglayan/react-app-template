import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateUserImageWebApi } from "../Redux/Selectors/userSelector";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  Avatar: {
    width: 150,
    height: 150
  }
}));
const AvatarForm = (props) => {
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        avatarImageUrl: !props.avatarImageUrl
          ? "Resim Yok"
          : props.avatarImageUrl
      }}
      validate={(values) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Hey");
        console.log(values);
        props
          .dispatch(updateUserImageWebApi(values.file, props.token))
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
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Typography variant="h5">Profil Resmini Güncelle</Typography>
          <Typography variant="subtitle2">
            Profil resminizi güncelleyebilirsiniz.
          </Typography>
          <Grid
            alignItems="center"
            container
            style={{ marginTop: "10px" }}
            spacing={6}
            xs={10}
          >
            <Grid
              container
              direction="row-reverse"
              style={{ marginTop: "25px" }}
              xs={3}
            >
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
            </Grid>
            <Grid item style={{ marginTop: "25px" }} xs={9}>
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
                    )
                  }}
                ></TextField>
              </Grid>
              <Grid item style={{ marginTop: "20px" }} xs={12}>
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
            </Grid>
          </Grid>
        </form>
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
    token: state.userReducer.token
  };
})(AvatarForm);

export default AvatarFormCon;
