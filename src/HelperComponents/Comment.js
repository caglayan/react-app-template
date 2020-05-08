import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "0",
    maxWidth: "100%"
  },
  image: {
    width: 90,
    height: 90
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function Comment() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src="https://experience.sap.com/fiori-design-web/wp-content/uploads/sites/5/2017/02/Avatar-Sizes-Custom-1.png"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography variant="subtitle1">Betül Akıncı</Typography>
                <Typography variant="body2" gutterBottom color="textSecondary">
                  3 gün önce
                </Typography>
                <Typography variant="body2" gutterBottom>
                  1500'lerden beri kullanılmakta olan standard Lorem Ipsum
                  metinleri ilgilenenler için yeniden üretilmiştir. Çiçero
                  tarafından yazılan 1.10.32 ve 1.10.33 bölümleri de 1914 H.
                  Rackham çevirisinden alınan İngilizce sürümleri eşliğinde
                  özgün biçiminden yeniden üretilmiştir.
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <ThumbUp style={{ width: "30px", height: "24px" }} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
