import { observable, action } from "mobx";
import { ApiCall } from "./ApiCall.js";
import React, { useEffect, useState, useContext } from "react";
import { createContext } from "react";

class AppState {
  @observable Rows = [""];
  GetData = () => {
    ApiCall("Get", "https://api.coincap.io/v2/assets?limit=20").then(
      (results) => {
        console.log(results);
        this.Rows = results.data;
        console.log(this.Rows);
      }
    );
  };
}

const AppStateContext = createContext(new AppState());
export default AppStateContext;
