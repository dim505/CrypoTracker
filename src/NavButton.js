import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";

const NavButton = (props) => {
  return (
    <Button
      onClick={() => props.HandleButtonClick(props.ButtonText)}
      variant={props.ActiveButton === props.ButtonText ? "contained" : ""}
      color="primary"
    >
      {props.ButtonText}
    </Button>
  );
};

export default NavButton;
