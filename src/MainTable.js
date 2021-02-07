import React, { useEffect, useState, useContext } from "react";
import { TableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";

import { observer } from "mobx-react";
const MainTable = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Volume (24 HR)</TableCell>
            <TableCell>Circulating Supply</TableCell>
            <TableCell>Change (24 hr)</TableCell>
            <TableCell>Trade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              onClick={() => {
                props.OpenModal(row.name.props.children[2]);
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
                    Math.sign(row.changePercent24Hr) === -1
                      ? "ColorRed"
                      : "ColorGreen"
                }}
              >
                {row.Change}
              </TableCell>

              <TableCell>{row.Trade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(MainTable);
