import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import Header from "./Header/Header";
import TableContainer from "./Table/TableContainer";
import AppStateContext from "./Shared/appState";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
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
      </PerfectScrollbar>
    </>
  );
};

export default App;
