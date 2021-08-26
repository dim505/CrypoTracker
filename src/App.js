import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import Header from "./Header/Header";
import TableContainer from "./Table/TableContainer";
import AppStateContext from "./Shared/appState";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Snackbar from '@material-ui/core/Snackbar';

import { observer } from "mobx-react";
const App = () => {
  const AppState = useContext(AppStateContext);
  //gets data for application
  useEffect(() => {
    AppState.GetData();
  }, []);

  return (
    <>
      <Header />
      <PerfectScrollbar
        onScrollDown={(Container) => {
          var currentScrollPos = Container.scrollHeight - Container.scrollTop;
          var BottomOfScreen = Container.clientHeight + 1;
          if (currentScrollPos <= BottomOfScreen) {
            AppState.LoadMoreCrypto();
          }
        }}
        className="Container"
      >
        <TableContainer />
        <Snackbar
 
        open={AppState.OpenError}
        onClose={() => AppState.OpenErrorSnackBar(false)}
        message="Opps.... A network error has occured. Please try refreshing the app or reclicking the button."
       
      />
      </PerfectScrollbar>
    </>
  );
};

export default observer(App);
