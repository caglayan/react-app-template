/* 
TODO:
* Change Name of SideBar 
* Add this side bar to Layout
* Make logout function
* Make login jsx


FIXME:
*/

import React from "react";
import "./App.css";
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Divider
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import BodyArea from "./Layout/BodyArea";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import SideMenu from "./Layout/SideMenu";
import SnackBar from "./Dialogs/SnackBar";
import LoginSignupDialog from "./Dialogs/LoginSignupDialog";
import configureStore from "./Redux/Store/configStore";
import {
  startCreateUserLocal,
  startRemoveUserLocal
} from "./Redux/Selectors/userSelector";
import {
  startCreatePublicCourse,
  startRemovePublicCourseLocal
} from "./Redux/Selectors/courseSelector";

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

export default function App() {
  const [loginIsActive, setLoginIsActive] = React.useState(false);
  const [dialogType, setDialogType] = React.useState("Login");
  const [snackIsActive, setSnackIsActive] = React.useState(false);
  const [snackType, setSnackType] = React.useState(1);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  React.useEffect(() => {
    startCreateUserLocal(store.dispatch)
      ? console.log("user logged in")
      : console.log("user not logged in");

    store
      .dispatch(startCreatePublicCourse("5df92c57ea9f59862aabd1ab"))
      .then((course) => {})
      .catch((err) => {
        handleDialogError("Bir hata meydana geldi.");
      });
  }, []);

  const logoutUser = () => {
    console.log("user logout");
    startRemoveUserLocal(store.dispatch);
  };

  const handleClickLoginOpen = () => {
    console.log("login button is clicked");
    setLoginIsActive(true);
    setDialogType("Login");
  };

  const handleClickSignupOpen = () => {
    console.log("signup button is clicked");
    setLoginIsActive(true);
    setDialogType("Signup");
  };

  const handleCloseDialog = () => {
    console.log("close dialog");
    setLoginIsActive(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackIsActive(false);
  };

  const handleDialogError = (message) => {
    console.log(message);
    setSnackType(2);
    setSnackMessage(message);
    setSnackIsActive(true);
  };

  const handleOpenSideMenu = () => {
    setSideMenuOpen(true);
  };
  const handleCloseSideMenu = () => {
    setSideMenuOpen(false);
  };

  const changeDialogType = (type) => {
    setDialogType(type);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header
              isUserLogin={false}
              loginOpen={handleClickLoginOpen}
              signupOpen={handleClickSignupOpen}
              sideMenuOpen={handleOpenSideMenu}
            />
            <Divider />
            <BodyArea />
            <Footer />
            <LoginSignupDialog
              closeDialog={handleCloseDialog}
              isActive={loginIsActive}
              type={dialogType}
              onError={handleDialogError}
              changeType={changeDialogType}
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
