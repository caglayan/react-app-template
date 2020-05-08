import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { startRemoveUserLocal } from "../Redux/Selectors/userSelector";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    minHeight: "54vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3)
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  Avatar: {
    width: "auto",
    height: 90
  },
  ListItemActive: {
    backgroundColor: theme.palette.action.selected
  },
  card: {
    display: "flex",
    marginBottom: "20px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  controlsArea: {
    display: "flex",
    flexDirection: "row"
  },
  subTotal: {
    marginTop: "20px"
  }
}));
const Account = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const logoutUser = () => {
    console.log("user logout");
    startRemoveUserLocal(props.dispatch);
    props.history.push("/");
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Grid
        direction="row"
        justify="center"
        alignItems="center"
        container
        xs={12}
        spacing={2}
      >
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {props.shoppingCart ? props.shoppingCart[0].title : null}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.shoppingCart
                  ? props.shoppingCart[0].subtitle.givenName +
                    " " +
                    props.shoppingCart[0].subtitle.familyName
                  : null}
              </Typography>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.root}
              spacing={2}
            >
              <Grid item xs={6}>
                <div className={classes.controls}>
                  <IconButton aria-label="previous">
                    {theme.direction === "rtl" ? <AddIcon /> : <RemoveIcon />}
                  </IconButton>
                  <Typography component="h5" variant="h5">
                    1
                  </Typography>
                  <IconButton aria-label="next">
                    {theme.direction === "rtl" ? <RemoveIcon /> : <AddIcon />}
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.controls}>
                  <Typography variant="subtitle1" color="textSecondary">
                    20,66 TL
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>

          <CardMedia
            className={classes.cover}
            image={props.shoppingCart ? props.shoppingCart[0].img : null}
            title={props.shoppingCart ? props.shoppingCart[0].title : null}
          />
        </Card>

        <Grid
          style={{ padding: "6px" }}
          className={classes.subTotal}
          container
          xs="12"
        >
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="subtitle1" color="textPrimary">
                Ara Toplam (Vergiler Dahil)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1" color="textSecondary">
                20,66 TL
              </Typography>
            </Box>
          </Grid>
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="subtitle1" color="textPrimary">
                Kargo Ücreti
              </Typography>
            </Box>
          </Grid>
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1" color="textSecondary">
                7,66 TL
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs="12">
          <Divider />
        </Grid>
        <Grid style={{ padding: "6px" }} container xs="12">
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="subtitle1" color="textPrimary">
                Toplam
              </Typography>
            </Box>
          </Grid>
          <Grid item xs="6">
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1" color="textSecondary">
                35,66 TL
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid style={{ padding: "6px" }} container xs="12">
          <Grid item xs="12">
            <Typography variant="subtitle2" color="textSecondary">
              Ödeme yap butonuna bastığınızda uzaktan ödeme anlaşmasını kabul
              etmiş olursunuz.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs="12">
          <Button
            style={{ top: "10px", width: "100%" }}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Satın Al
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const AccountCon = connect((state) => {
  return {
    _id: state.userReducer._id,
    shoppingCart: state.userReducer.shoppingCart
  };
})(Account);

export default AccountCon;
