import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Container } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import logo from "../logo.svg";

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles((theme) => ({
  MainGrid: {
    backgroundColor: "tarnsparent",
  },
  Footer: {
    backgroundColor: "#eff1fe",
  },
  logo: {
    width: "30%",
  },
  inlineIcon: {
    verticalAlign: "bottom",
  },
  mailTypograpgh: {
    marginTop: "",
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px",
    },
  },
  grow: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <div className={classes.Footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <img
              style={{ marginTop: "20px" }}
              src={logo}
              className={classes.logo}
              alt="logo"
            />
            <Typography
              style={{ marginTop: "20px" }}
              variant="body1"
              gutterBottom
            >
              Hi! We are the energetic and passinoate team creates next
              generation AI based text tools.
            </Typography>
          </Grid>
          <Grid item sm={4} className={classes.grow} />
          <Grid item sm={4}>
            <Typography
              className={classes.mailTypograpgh}
              variant="body1"
              gutterBottom
            >
              <Link href="mailto:hello@kiraz.io?subject=I have a message">
                hello@kiraz.io
              </Link>
            </Typography>
            <Typography
              style={{ marginTop: "20px" }}
              variant="body1"
              gutterBottom
            >
              I{" "}
              <FavoriteIcon className={classes.inlineIcon} color="secondary" />{" "}
              Istanbul
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item sm={12}>
            <Divider></Divider>
          </Grid>
          <Typography variant="body1" gutterBottom>
            Copyright 2020 NinjaCoders All Rights Reserved.
          </Typography>
        </Grid>
      </Container>
    </div>
  );
}
