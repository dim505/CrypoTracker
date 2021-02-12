import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import Header from "./Header";
import TableContainer from "./TableContainer";
import AppStateContext from "./appState";
import "react-perfect-scrollbar/dist/css/styles.css";
import Typography from "@material-ui/core/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
const App = () => {
  const AppState = useContext(AppStateContext);

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
      </PerfectScrollbar>
    </>
  );
};

export default App;
