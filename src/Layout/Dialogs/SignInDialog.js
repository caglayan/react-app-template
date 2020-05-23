import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SignInComp from "../../Components/SignIn/SignIn";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function SignInDialogContent(props) {
  const classes = useStyles();
  const { isActive, closeDialog, ...propsChild } = props;
  return (
    <div>
      <Dialog
        open={isActive}
        onClose={closeDialog}
        aria-labelledby="SignInDialog"
        aria-describedby="SignIn Dialog"
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
        <SignInComp
          closeDialog={props.closeDialog}
          {...propsChild}
        ></SignInComp>
      </Dialog>
    </div>
  );
}
