/* 
TODO:
* Change Name of SideBar 
* Add this side bar to Layout
* Make logout function
* Make login jsx
* https://themeforest.net/item/xamin-data-science-analytics-html-template/25267587

FIXME:
*/

import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import BodyArea from "./Layout/BodyArea";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import SideMenu from "./Layout/SideMenu";
import SnackBar from "./Components/SnackBar/SnackBar";
import SignInDialog from "./Layout/Dialogs/SignInDialog";
import SignUpDialog from "./Layout/Dialogs/SignUpDialog";
import configureStore from "./Redux/Store/configStore";
import {
  startCreateUserLocal,
  startRemoveUserLocal,
} from "./Redux/Selectors/userSelector";

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const theme = createMuiTheme({
  palette: {
    type: "light",
    secondary: {
      main: "#ec407a",
    },
    primary: {
      main: "#437eeb",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ["Karla", "sans-serif"].join(","),
    h5: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
    h1: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  },
});

export default function App() {
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (startCreateUserLocal(store.dispatch)) {
      console.log("user logged in");
    } else {
      console.log("user is not logged in");
      //setRedirctTo(true);
    }
  }, []);

  // ********************** DIALOGS ********************** //
  const [signinDialogIsActive, setSigninDialogIsActive] = React.useState(false);
  const [signupDialogIsActive, setSignupDialogIsActive] = React.useState(false);

  const closeDialogs = () => {
    console.log("Close all Dialogs");
    setSigninDialogIsActive(false);
    setSignupDialogIsActive(false);
  };

  const openSignInDialog = () => {
    closeDialogs();
    console.log("Sign In Button is clicked");
    setSigninDialogIsActive(true);
  };

  const openSignUpDialog = () => {
    closeDialogs();
    console.log("Sign Un Button is clicked");
    setSignupDialogIsActive(true);
  };
  // ********************** ERROR HANDLING ********************** //

  const [snackIsActive, setSnackIsActive] = React.useState(false);
  const [snackType, setSnackType] = React.useState(1);
  const [snackMessage, setSnackMessage] = React.useState("");

  const showMessages = (type, message) => {
    if (type == 1) {
      console.log("Success:", message);
      setSnackType(1);
      setSnackMessage(message);
      setSnackIsActive(true);
    } else if (type == 2) {
      console.log("Error:", message);
      setSnackType(2);
      setSnackMessage(message);
      setSnackIsActive(true);
    }
  };

  // ********************** USER ********************** //

  const logoutUser = () => {
    console.log("user logout");
    startRemoveUserLocal(store.dispatch);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackIsActive(false);
  };

  const handleOpenSideMenu = () => {
    setSideMenuOpen(true);
  };
  const handleCloseSideMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
              isUserLogin={false}
              loginOpen={openSignInDialog}
              signupOpen={openSignUpDialog}
              sideMenuOpen={handleOpenSideMenu}
            />
            <BodyArea showMessages={showMessages} />
            <Footer />
            <SignInDialog
              isActive={signinDialogIsActive}
              signUpOpen={openSignUpDialog}
              closeDialog={closeDialogs}
              showMessages={showMessages}
            />
            <SignUpDialog
              isActive={signupDialogIsActive}
              signInOpen={openSignInDialog}
              closeDialog={closeDialogs}
              showMessages={showMessages}
            />
            <SnackBar
              type={snackType}
              message={snackMessage}
              closeSnack={handleCloseSnack}
              isActive={snackIsActive}
            />
            <SideMenu
              isOpen={sideMenuOpen}
              open={handleOpenSideMenu}
              close={handleCloseSideMenu}
              logoutUser={logoutUser}
            />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
