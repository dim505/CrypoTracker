import React, { useEffect, useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import AppStateContext from "../Shared/appState";
import { observer } from "mobx-react";

const SearchCoins = () => {
  const appState = useContext(AppStateContext);
  //function to calcualte time lasped
  const GetTimeElapsed = (startTime) => {
    var elapsedTime = Date.now() - startTime;
    return elapsedTime;
  };

  //searches coins with each key entered
  const handleChange = async (SearchTerm) => {
    appState.SearchCoins(SearchTerm);
  };


  //keeps track of  selected Fiat 
  const UpdateFiat = (event) => {
    appState.UpdateSelectedFiat(event.target.value);
  };

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="SearchCoins">Search Coins</InputLabel>
        <Input
          onChange={(event) => handleChange(event.target.value)}
          id="SearchCoins"
          endAdornment={
            <div>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </div>
          }
        />
      </FormControl>

      <FormControl
        classes={{
          root: "Fiat"
        }}
      >
        <InputLabel htmlFor="Fiat">Fiat</InputLabel>
        <NativeSelect onChange={UpdateFiat} id="Fiat">
          <option value="USD"> USD</option>
          {appState.Fiats.map((fiat) => {
            return (
              <option value={fiat.symbol}> {fiat.symbol.padEnd(100)}</option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default observer(SearchCoins);
