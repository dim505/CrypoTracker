import React, { useEffect, useState, useContext } from "react";
import { TableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import AppStateContext from "../Shared/appState";
import Fade from 'react-reveal/Fade';
import { observer } from "mobx-react";


//contains desktop table 
const MainTable = (props) => {
  const appState = useContext(AppStateContext);
  //fixes missing Crypto icons
  useEffect(() => {
    appState.setCrypoPics();
  }, []);

  return (
    <Fade top cascade>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell> Market Cap</TableCell>

            <TableCell>Price</TableCell>
            <TableCell>Volume (24 HR)</TableCell>
            <TableCell>Circulating Supply</TableCell>
            <TableCell>Change (24 hr)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
     
  
          {props.data.map((row) => (
            <TableRow
              key={row.Key}
              onClick={() => {
                props.OpenModal(row.Key);
              }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.MarketCap}</TableCell>
              <TableCell>{row.Price}</TableCell>
              <TableCell>{row.Volume24hr}</TableCell>
              <TableCell>{row.CirculatingSupply}</TableCell>
              <TableCell
                classes={{
                  root:
                    Math.sign(parseFloat(row.Change.props.value)) === -1
                      ? "ColorRed"
                      : "ColorGreen"
                }}
              >
                {row.Change}
              </TableCell>
            </TableRow>
          ))}



        </TableBody>
      </Table>
    </TableContainer>

    </Fade>
  );
};

export default observer(MainTable);
