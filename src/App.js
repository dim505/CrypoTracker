import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import Header from "./Header";
import SearchCoins from "./SearchCoins";
import TableContainer from "./TableContainer";
import AppStateContext from "./appState";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
const App = () => {
  const AppState = useContext(AppStateContext);

  useEffect(() => {
    AppState.GetData();
  }, []);

  return (
    <div>
      <PerfectScrollbar
        onScrollDown={(Container) => {
          var currentScrollPos = Container.scrollTop;
          console.log(currentScrollPos);
          if (
            Container.scrollHeight - currentScrollPos <=
            Container.clientHeight + 0.5
          )
            AppState.LoadMoreCrypto();
          console.log("you are at the bottm");
        }}
        className="Container"
      >
        <Header />
        <SearchCoins />
        <TableContainer />
      </PerfectScrollbar>
    </div>
  );
};

export default App;
