import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Person, ThumbUp, SignalCellularAltTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({

}));

export default function InstStat() {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={0}>
      <Grid item>
        <Person style={{ width: "30px", height: "24px" }} />
      </Grid>
      <Grid item>
        <Typography variant="body2" style={{ width: "30px", height: "20px" }}>
          333
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          style={{ width: "100%", textAlign: "center" }}
        >
          Öğrenci
        </Typography>
      </Grid>
    </Grid>
  );
}
