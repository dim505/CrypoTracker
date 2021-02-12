import { observable, action, computed } from "mobx";
import { ApiCall } from "./ApiCall.js";
import React, { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import GenCrypto from "./GenericCrypo.svg";

class AppState {
  @observable Rows = [];
  @observable RowsFiltered = [];
  @observable Fiats = [];
  @observable SelectedFiat = "USD";
  @observable SearchArray = [];

  setCrypoPics = () => {
    setTimeout(() => {
      var items = document.getElementsByClassName("CrytpoIcon");
      for (var item of items) {
        if (item.innerHTML.search("undefined") !== -1) {
          item.innerHTML = `<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#efb914" fill-rule="nonzero" r="16"/><path d="M21.002 9.855A7.947 7.947 0 0124 15.278l-2.847-.708a5.357 5.357 0 00-3.86-3.667c-2.866-.713-5.76.991-6.465 3.806s1.05 5.675 3.917 6.388a5.373 5.373 0 005.134-1.43l2.847.707a7.974 7.974 0 01-5.2 3.385L16.716 27l-2.596-.645.644-2.575a8.28 8.28 0 01-1.298-.323l-.643 2.575-2.596-.646.81-3.241c-2.378-1.875-3.575-4.996-2.804-8.081s3.297-5.281 6.28-5.823L15.323 5l2.596.645-.644 2.575a8.28 8.28 0 011.298.323l.643-2.575 2.596.646z" fill="#fff"/></g></svg> `;
        }
      }
    }, 1000);
  };
  GetData = () => {
    ApiCall("Get", "https://api.coincap.io/v2/assets?limit=600").then(
      (results) => {
        this.Rows = results.data;
        this.RowsFiltered = results.data.slice(0, 200);
        this.IsLoaded = true;

        this.setCrypoPics();
      }
    );

    ApiCall("Get", "https://api.coincap.io/v2/rates").then((results) => {
      this.Fiats = results.data;
    });
  };

  UpdateSelectedFiat = (NewFiat) => {
    this.SelectedFiat = NewFiat;
  };

  SearchCoins = (CoinSearch) => {
    this.SearchArray = this.Rows.filter((Row) => {
      if (Row.name.toLowerCase().includes(CoinSearch.toLowerCase())) {
        return Row.name;
      }
    });

    this.RowsFiltered = this.SearchArray.slice(0, 25);

    if (CoinSearch === "") {
      this.RowsFiltered = this.Rows.slice(0, 25);
      this.SearchArray = [];
    }
    document.getElementsByClassName("Container")[0].scrollTop = 0;
    this.setCrypoPics();
  };

  CalculatePrice(BaseUsdPrice) {
    if (this.SelectedFiat !== "USD") {
      var FilteredArray = this.Fiats.filter(
        (fiat) => fiat.symbol === this.SelectedFiat
      );

      return BaseUsdPrice * (1 / FilteredArray[0].rateUsd);
    } else {
      return BaseUsdPrice;
    }
  }

  LoadMoreCrypto = () => {
    if (this.SearchArray.length > 0) {
      this.RowsFiltered = [
        ...this.RowsFiltered,
        ...this.SearchArray.slice(
          this.RowsFiltered.length,
          this.RowsFiltered.length + 200
        )
      ];
      this.setCrypoPics();
    } else {
      this.RowsFiltered = [
        ...this.RowsFiltered,
        ...this.Rows.slice(
          this.RowsFiltered.length,
          this.RowsFiltered.length + 200
        )
      ];
      this.setCrypoPics();
    }

    console.log("Loaded More Crypto");
  };
}

const AppStateContext = createContext(new AppState());
export default AppStateContext;
