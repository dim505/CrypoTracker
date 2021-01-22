import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import Divider from "@material-ui/core/Divider";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import { observer } from "mobx-react";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import AppStateContext from "./appState";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { Icon } from "coinmarketcap-cryptocurrency-icons";
const App = () => {
  const AppState = useContext(AppStateContext);
  console.log(AppState);
  const [Rows, SetRows] = useState([]);

  useEffect(() => {
    AppState.GetData();
    console.log(AppState.Rows);

    setTimeout(() => {
      var items = document.getElementsByClassName("CrytpoIcon");
      for (var item of items) {
        if (item.innerHTML.search("undefined") !== -1) {
          console.log(item.innerHTML);
          item.innerHTML = `<img src="https://icon-icons.com/icons2/1385/PNG/32/generic-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95340.png" /> `;
        }
      }
    }, 500);
  }, []);
  return (
    <div className="Container">
      <div className="NavBar">
        <TimelineIcon />

        <Typography variant="h5">CryptoTracker</Typography>
        <div className="FlexEnd">
          <Typography display="inline" variant="body2" gutterBottom>
            Day Mode
          </Typography>
          <Switch color="primary" />
          <Typography display="inline" variant="body2" gutterBottom>
            Night Mode
          </Typography>
        </div>
      </div>
      <Divider />
      <div>
        <InputLabel htmlFor="dasdas">Search Coins</InputLabel>
        <Input
          value="dasdas"
          endAdornment={
            <div>
              <IconButton aria-label="toggle password visibility">
                <SearchIcon />
              </IconButton>
            </div>
          }
        />

        <FormControl>
          <InputLabel htmlFor="demo-customized-select-native">
            Currency
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            /* value={ten}
              onChange={handleChange} 
              input={<BootstrapInput />} */
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </div>

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
            {AppState.Rows.length > 1 ? (
              AppState.Rows.map((row) => (
                <TableRow>
                  <TableCell>
                    <p>
                      <div className="CrytpoIcon">
                        <Icon i={row.symbol.toLowerCase()} size={32} />
                      </div>
                      <span id="CryptoSymbol"> {row.symbol} </span>

                      {row.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <NumberFormat
                      value={row.marketCapUsd}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={row.priceUsd}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={row.volumeUsd24Hr}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={3}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={row.maxSupply}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={0}
                    />
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        Math.sign(row.changePercent24Hr) === -1
                          ? "ColorRed"
                          : "ColorGreen"
                    }}
                  >
                    <NumberFormat
                      value={row.changePercent24Hr}
                      displayType={"text"}
                      decimalScale={2}
                      suffix="%"
                      renderText={(value) =>
                        Math.sign(row.changePercent24Hr) === -1 ? (
                          <div>
                            {" "}
                            <ArrowDropDownIcon viewBox="0 -7 24 24" /> {value}{" "}
                          </div>
                        ) : (
                          <div>
                            <ArrowDropUpIcon viewBox="0 -7 24 24" /> {value}{" "}
                          </div>
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Button size="small" color="primary">
                      Buy
                    </Button>{" "}
                    /
                    <Button size="small" color="primary">
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(App);
