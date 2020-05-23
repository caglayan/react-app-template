import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SignUpComp from "../../Components/SignUp/SignUp";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function SignUpDialogContent(props) {
  const classes = useStyles();
  const { isActive, closeDialog, ...propsChild } = props;
  return (
    <div>
      <Dialog
        open={props.isActive}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.Dialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <SignUpComp
          closeDialog={props.closeDialog}
          {...propsChild}
        ></SignUpComp>
      </Dialog>
    </div>
  );
}
