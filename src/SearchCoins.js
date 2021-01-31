import React, { useEffect, useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import AppStateContext from "./appState";
import { observer } from "mobx-react";

const SearchCoins = () => {
  const appState = useContext(AppStateContext);
  //const [Searchterm, SetSearchTerm] = useState("");

  const GetTimeElapsed = (startTime) => {
    var elapsedTime = Date.now() - startTime;
    return elapsedTime;
  };

  const handleChange = async (SearchTerm) => {
    appState.SearchCoins(SearchTerm);
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
        <NativeSelect onChange={handleChange} id="Fiat">
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