import React, { useEffect, useState, useContext } from "react";
import Divider from "@material-ui/core/Divider";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import useDarkMode from "use-dark-mode";
import SearchCoins from "./SearchCoins";
const Header = () => {
  const darkMode = useDarkMode(false);

  return (
    <>
      <div className="NavBar">
        <TimelineIcon />

        <Typography variant="h5">CryptoTracker</Typography>

        <div className="FlexEnd">
          <Typography display="inline" variant="body2" gutterBottom>
            Night Mode
          </Typography>
          <Switch onClick={darkMode.toggle} color="primary" />
          <Typography display="inline" variant="body2" gutterBottom>
            Day Mode
          </Typography>
        </div>
      </div>
      <Divider />
      <SearchCoins />
    </>
  );
};

export default Header;
