import React, { useEffect, useState, useContext } from "react";
import ResponsiveTable from "material-ui-next-responsive-table";
import AppStateContext from "../Shared/appState";
 

//contains table for mobile view
const MobileTable = (props) => {
  const appState = useContext(AppStateContext);
  useEffect(() => {
    appState.setCrypoPics();
  }, []);
  return (
  
 
    
    <ResponsiveTable data={props.data} columns={props.columns} />
     )
    ;
};

export default MobileTable;
