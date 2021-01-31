import React, { useEffect, useState, useContext } from "react";
import AppStateContext from "./appState";
import { observer } from "mobx-react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Typography from "@material-ui/core/Typography";
import MainTable from "./MainTable";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MobileTable from "./MobileTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import NumberFormat from "react-number-format";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import { Icon } from "coinmarketcap-cryptocurrency-icons";

const TableContainer = () => {
  const AppState = useContext(AppStateContext);
  const IsMobile = useMediaQuery("(max-width: 970px)");
  window.IsMobile = IsMobile;
  const columns = [
    {
      key: "name",
      label: "Name"
    },
    {
      key: "MarketCap",
      label: "Market Cap"
    },
    {
      key: "Price",
      label: "Price"
    },

    {
      key: "Volume24hr",
      label: "Volume 24 HR."
    },
    {
      key: "CirculatingSupply",
      label: "Circulating Supply"
    },
    {
      key: "Change",
      label: "Change (24 hr)"
    },
    {
      key: "Trade",
      label: "Trade"
    }
  ];

  useEffect(() => {
    RenderTable();
  });

  const RenderTable = () => {
    if (
      IsMobile &&
      document.getElementsByClassName("MuiTableContainer-root")[0] !==
        undefined &&
      document.getElementsByClassName("ResponsiveTable-root-5")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "MuiTableContainer-root"
      )[0].style.display = "none";
      document.getElementsByClassName(
        "ResponsiveTable-root-5"
      )[0].style.display = "block";
    } else if (
      !IsMobile &&
      document.getElementsByClassName("MuiTableContainer-root")[0] !==
        undefined &&
      document.getElementsByClassName("ResponsiveTable-root-5")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "MuiTableContainer-root"
      )[0].style.display = "block";
      document.getElementsByClassName(
        "ResponsiveTable-root-5"
      )[0].style.display = "none";
    }
  };

  const data = AppState.RowsFiltered.map((row) => {
    var RowObj = {
      name: (
        <div>
          <div className="CrytpoIcon">
            <Icon i={row.symbol.toLowerCase()} size={32} />
          </div>
          <span id="CryptoSymbol"> {row.symbol} </span>

          {row.name}
        </div>
      ),
      MarketCap: (
        <NumberFormat
          value={AppState.CalculatePrice(row.marketCapUsd)}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" " + AppState.SelectedFiat}
          decimalScale={2}
        />
      ),
      Price: (
        <NumberFormat
          value={AppState.CalculatePrice(row.priceUsd)}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" " + AppState.SelectedFiat}
          decimalScale={2}
        />
      ),
      Volume24hr: (
        <NumberFormat
          value={row.volumeUsd24Hr}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={3}
        />
      ),
      CirculatingSupply: (
        <NumberFormat
          value={
            AppState.CalculatePrice(row.volumeUsd24Hr) +
            " " +
            AppState.SelectedFiat
          }
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={3}
        />
      ),
      Change: (
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
      ),

      Trade: (
        <div>
          <Button size="small" color="primary">
            Buy
          </Button>{" "}
          /
          <Button size="small" color="primary">
            Sell
          </Button>{" "}
        </div>
      )
    };

    return RowObj;
  });

  return (
    <div>
      {AppState.RowsFiltered.length >= 1 ? (
        <>
          {IsMobile ? (
            <MobileTable data={data} columns={columns} />
          ) : (
            <MainTable data={data} />
          )}
        </>
      ) : AppState.IsLoaded === true ? (
        <div className="center">
          {" "}
          <MoodBadIcon fontSize="large" />{" "}
          <Typography display="inline" variant="h3" gutterBottom>
            No coins found
          </Typography>{" "}
          <MoodBadIcon fontSize="large" />
        </div>
      ) : (
        <div className="center">
          <Typography variant="h3" gutterBottom>
            Loading.........
          </Typography>{" "}
        </div>
      )}
    </div>
  );
};

export default observer(TableContainer);
