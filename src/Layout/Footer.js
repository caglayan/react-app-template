import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import blueGrey from "@material-ui/core/colors/blueGrey";

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles(theme => ({
  MainGrid: {
    backgroundColor: "tarnsparent",
    marginLeft: "40px"
  },
  Footer: {
    backgroundColor: blueGrey[900]
  }
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.Footer}>
      <Grid
        className={classes.MainGrid}
        container
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        style={{padding:"20px"}}
      >
        <Grid
          container
          item
          xs={2}
          direction="column"
          justify="flex-start"
          spacing={0}
        >
          <Grid item>
            <Typography variant="h6">Miuul</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Hakkımızda</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Kariyer</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Blog</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={2}
          direction="column"
          justify="flex-start"
          spacing={0}
        >
          <Grid item>
            <Typography variant="h6">Topluluk</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Yazar Ol</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Üniversiteler</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={2}
          direction="column"
          justify="flex-start"
          spacing={0}
        >
          <Grid item>
            <Typography variant="h6">Eğitmenlik</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Hakkımızda</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Kariyer</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Blog</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 30, marginBottom: 10 }} />
      <Grid spacing={3} container direction="row" alignItems="center">
        <Grid item xs={4}>
          <Typography
            style={{ marginLeft: "40px", height: "30px" }}
            variant="body2"
          >
            Copyright © 2019 Miuul, Inc.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid
            spacing={3}
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Typography variant="body2">Destek</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Gizlilik</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Koşullar</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
