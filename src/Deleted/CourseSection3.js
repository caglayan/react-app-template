import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Comment from "../HelperComponents/Comment";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3)
    }
  }
}));

export default function CourseSection3() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Typography variant="body1" component="h1">
            <Box fontWeight="fontWeightMedium">Öne Çıkan Yorum</Box>
          </Typography>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Comment></Comment>
        </Grid>
      </Grid>
    </Container>
  );
}
