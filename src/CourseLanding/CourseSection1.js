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
import { connect } from "react-redux";
import PlayCircleOutlineOutlined from "@material-ui/icons/PlayCircleOutlineOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LockOutlined from "@material-ui/icons/LockOutlined";
import PauseCircleOutlineOutlined from "@material-ui/icons/PauseCircleOutlineOutlined";

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3)
    }
  },
  courseName: {
    paddingInlineEnd: "10px",
    display: "inline-flex",
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      borderRight: "none"
    }
  },
  courseType: {
    borderLeft: "0.05em solid white",
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
  },
  icon: {
    color: theme.palette.secondary.dark,
    minWidth: "36px"
  }
}));

const CourseVideoContent = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    selChapter: 0,
    selSection: 0,
    shownChapters: { 0: true }
  });
  const [playerState, setPlayerState] = React.useState({
    source: null,
    isPlaying: false
  });

  const expandChapters = (index) => {
    setState({
      shownChapters: {
        ...state.shownChapters,
        [index]: !state.shownChapters[index]
      }
    });
  };

  const playSource = (url, chapter, section) => {
    setState((prevState) => {
      return {
        ...prevState,
        selChapter: chapter,
        selSection: section
      };
    });
    setPlayerState((prevState) => {
      return {
        ...prevState,
        source: {
          type: "video",
          sources: [
            {
              src: url,
              type: "video/mp4",
              size: 720
            }
          ]
        }
      };
    });
  };

  React.useEffect(() => {
    if (props.chapters) {
      console.log("initilize video");
      playSource(props.chapters[0].sections[0].video, 0, 0);
    }
  }, [props.chapters]);

  const subscribeVideoPlayer = (state) => {
    //console.log(state.currentTime / state.duration);
    setPlayerState((prevState) => {
      return {
        ...prevState,
        isPlaying: !state.paused
      };
    });
  };

  const msToTime = (duration) => {
    let seconds = Math.floor(duration % 60),
      minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let str = "";
    if (hours > 0) {
      str = "(" + str + hours + " saat " + minutes + " dakika" + ")";
    } else if (minutes > 0) {
      str = "(" + str + minutes + " dakika" + ")";
    }
    return str;
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography variant="h5" component="h1">
        <Box className={classes.courseName} fontWeight="fontWeightBold">
          {props.title}
        </Box>
        {props.isBelongMiuul == true ? (
          <Box className={classes.courseType} fontWeight="fontWeightBold">
            Original
          </Box>
        ) : null}
      </Typography>
      <Typography variant="subtitle1" component="h1">
        <Box className={classes.CourseInstName} fontWeight="fontWeightLight">
          {props.instructor
            ? props.instructor.givenName + " " + props.instructor.familyName
            : null}
        </Box>
        <Box className={classes.followButton} fontWeight="fontWeightBold"></Box>
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
          {props.chapters ? (
            <VideoPlayer
              subscription={subscribeVideoPlayer}
              source={playerState.source}
            ></VideoPlayer>
          ) : null}
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
          <List>
            <ListItem key="112233">
              <Box
                className={classes.CourseInstName}
                fontWeight="fontWeightLight"
              >
                <Typography variant="subtitle1">
                  {props.numberOfSections} Ders {msToTime(props.duration)}
                </Typography>
              </Box>
            </ListItem>
            {props.chapters
              ? props.chapters.map((chapter, indexChap) => {
                  return (
                    <div key={indexChap}>
                      <ListItem
                        button
                        onClick={() => {
                          return expandChapters(indexChap);
                        }}
                      >
                        <ListItemText
                          secondary={indexChap + 1 + ". " + chapter.title}
                        />
                        {state.shownChapters[indexChap] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={state.shownChapters[indexChap]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {chapter.sections.map((section, indexSec) => {
                            return (
                              <ListItem
                                button
                                key={section._id}
                                className={classes.nested}
                                selected={
                                  state.selChapter === indexChap &&
                                  state.selSection === indexSec
                                    ? true
                                    : false
                                }
                                onClick={() => {
                                  return playSource(
                                    section.video,
                                    indexChap,
                                    indexSec
                                  );
                                }}
                              >
                                {section.isPublic === true ? (
                                  <ListItemIcon className={classes.icon}>
                                    {playerState.isPlaying === true &&
                                    state.selChapter === indexChap &&
                                    state.selSection === indexSec ? (
                                      <PauseCircleOutlineOutlined />
                                    ) : (
                                      <PlayCircleOutlineOutlined />
                                    )}
                                  </ListItemIcon>
                                ) : (
                                  <ListItemIcon className={classes.icon}>
                                    <LockOutlined />
                                  </ListItemIcon>
                                )}

                                <ListItemText secondary={section.title} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    </div>
                  );
                })
              : null}
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
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
};

const CourseVideoContentCon = connect((state) => {
  return {
    _id: state.courseReducer._id,
    title: state.courseReducer.title,
    isBelongMiuul: state.courseReducer.isBelongMiuul,
    instructor: state.courseReducer.instructor,
    description: state.courseReducer.description,
    duration: state.courseReducer.duration,
    numberOfSections: state.courseReducer.numberOfSections,
    chapters: state.courseReducer.chapters
  };
})(CourseVideoContent);

export default CourseVideoContentCon;
