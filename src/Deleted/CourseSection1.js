import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import VideoPlayer from "../HelperComponents/VideoPlayer";
import ReactResizeDetector from "react-resize-detector";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3)
    }
  },
  courseName: {
    paddingInlineEnd: "10px",
    borderRight: "0.05em solid white",
    display: "inline-flex",
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      borderRight: "none"
    }
  },
  courseType: {
    paddingInlineStart: "10px",
    display: "inline-flex",
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      display: "none"
    }
  },
  CourseInstName: {
    paddingInlineEnd: "10px",
    margin: "0px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  followButton: {
    margin: "0px",
    paddingInlineStart: "10px",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  grid: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "stretch",
    width: "100%"
  },
  divider: {
    backgroundColor: theme.palette.background.paper,
    height: "60px"
  },
  tabs: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  root: {
    width: "100%"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function CourseVideoContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography variant="h5" component="h1">
        <Box className={classes.courseName} fontWeight="fontWeightBold">
          Python ile Veri Bilimi ve Makine Öğrenimi
        </Box>
        <Box className={classes.courseType} fontWeight="fontWeightBold">
          Original
        </Box>
      </Typography>
      <Typography variant="subtitle1" component="h1">
        <Box className={classes.CourseInstName} fontWeight="fontWeightLight">
          M. Vahit Keskin
        </Box>
        <Box className={classes.followButton} fontWeight="fontWeightBold">
          Takip Et
        </Box>
      </Typography>
      <Grid container className={classes.grid} spacing={1}>
        <Grid
          id="video"
          style={{ height: "100%", overflow: "hidden", whiteSpace: "nowrap" }}
          item
          sm={8}
          xs={12}
        >
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={props.onResize}
          />
          <VideoPlayer></VideoPlayer>
        </Grid>
        <Grid
          className={classes.gridChild}
          style={{
            height: props.height + "px",
            overflow: "auto",
            whiteSpace: "nowrap"
          }}
          item
          sm={4}
          xs={12}
        >
          <Typography variant="subtitle1" component="h1">
            <Box className={classes.CourseInstName} fontWeight="">
              34 Saat 45 Dakika
            </Box>
          </Typography>
          <List component="nav" className={classes.root}>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="1 Veri Bilimi için İstatistik" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="1.1 Örneklem Dağılımı" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="1.2 Varyans,Kovaryans,Korelasyon" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="1.3 Bernolli Dağılımı" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemText primary="1.4 Passon Dağılımı" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="2 Veri Bilimi için İstatistik" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="2 Veri Bilimi için İstatistik" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemText primary="2 Veri Bilimi için İstatistik" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={12}>
          Bu eğitimdeki yetenekler:
          <Chip style={{ marginLeft: 8 }} label="#Python" variant="outlined" />
          <Chip
            style={{ marginLeft: 8 }}
            label="#Veri Görselleştirme"
            variant="outlined"
          />
          <Chip
            style={{ marginLeft: 8 }}
            label="#Metin Madenciliği"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
