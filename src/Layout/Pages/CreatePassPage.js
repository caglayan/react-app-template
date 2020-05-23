import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CreatePasswordComp from "../../Components/CreatePassword/CreatePassword";

const useStyles = makeStyles((theme) => ({
  Container: {
    background: "#fff",
    borderRadius: "10px",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

export default function CreatePasswordContent(props) {
  const classes = useStyles();
  return (
    <Container className={classes.Container} maxWidth="sm">
      <CreatePasswordComp
        closeDialog={props.closeDialog}
        {...props}
      ></CreatePasswordComp>
    </Container>
  );
}
