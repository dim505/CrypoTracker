import React, { useEffect, useState, useContext } from "react";
import AppStateContext from "./appState";
import { observer } from "mobx-react";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Typography from "@material-ui/core/Typography";
import MainTable from "./MainTable";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MobileTable from "./MobileTable";
import NumberFormat from "react-number-format";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import { Icon } from "coinmarketcap-cryptocurrency-icons";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Graph from "./Graph";
import LaunchIcon from "@material-ui/icons/Launch";
import CardContent from "@material-ui/core/CardContent";
import { ApiCall } from "./ApiCall.js";
 
const TableContainer = () => {
  const AppState = useContext(AppStateContext);
  const [OpnModal, SetModal] = useState(false);
  const [SelectedCrypto, SetSelectedCrypto] = useState({
    name: "",
    symbol: ""
  });
  const [UseName, SetUseName] = useState("");

  const IsMobile = useMediaQuery("(max-width: 800px)");
  const OpenModal = (CryptoName) => {

    SetModal(true);

    ApiCall("Get", `https://api.coincap.io/v2/assets/${CryptoName}`).then(
      (results) => {
        if (results.data !== undefined) {
          SetSelectedCrypto(results.data);
          SetUseName(CryptoName);
        }
      }
    );

    
    setTimeout(() => {
      var IconElement = document.getElementById("ModalIcon");
      if (IconElement.innerHTML.search("undefined") !== -1) {
        IconElement.innerHTML = `<svg height="80" viewBox="0 0 32 32" width="80" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" fill="#efb914" fill-rule="nonzero" r="16"/><path d="M21.002 9.855A7.947 7.947 0 0124 15.278l-2.847-.708a5.357 5.357 0 00-3.86-3.667c-2.866-.713-5.76.991-6.465 3.806s1.05 5.675 3.917 6.388a5.373 5.373 0 005.134-1.43l2.847.707a7.974 7.974 0 01-5.2 3.385L16.716 27l-2.596-.645.644-2.575a8.28 8.28 0 01-1.298-.323l-.643 2.575-2.596-.646.81-3.241c-2.378-1.875-3.575-4.996-2.804-8.081s3.297-5.281 6.28-5.823L15.323 5l2.596.645-.644 2.575a8.28 8.28 0 011.298.323l.643-2.575 2.596.646z" fill="#fff"/></g></svg> `;
      }
    }, 1000);
  };

  const CloseModal = () => {
    SetModal(false);
    SetSelectedCrypto({
      name: "",
      symbol: ""
    });
  };
  window.IsMobile = IsMobile;
  const columns = [
    {
      key: "name",
      label: "Name"
    },

    { key: "PriceTracking", label: "Price Tracking" },
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
    }
  ];

  const data = AppState.RowsFiltered.map((row) => {
    var RowObj = {
      Key: row.id,
      name: (
        <div>
          <div className="CrytpoIcon">
            <Icon i={row.symbol.toLowerCase()} size={32} />
          </div>
          <span id="CryptoSymbol"> {row.symbol} </span>

          {row.name}
        </div>
      ),

      PriceTracking: (
        <>
          {IsMobile ? (
            <LaunchIcon
              classes={{ root: "pointer" }}
              onClick={() => OpenModal(row.id)}
            />
          ) : (
            <div />
          )}
        </>
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
            <MainTable
              OpenModal={(ClickedCrypto, CryptoSymbol) =>
                OpenModal(ClickedCrypto, CryptoSymbol)
              }
              data={data}
            />
          )}

          {AppState.SearchArray.length <= 0 ? (
            <div className="center">
              <Typography variant="h2" gutterBottom>
                Loading.........
              </Typography>{" "}
            </div>
          ) : (
            <div />
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

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={OpnModal}
        onClose={CloseModal}
        className="ModalStyle"
      >
        <Fade in={OpnModal} timeout={250}>
          <Paper
            classes={{
              root: IsMobile ? "ModalPaper ModalPaperMoble" : "ModalPaper"
            }}
          >
            {" "}
            <Grid container>
              <Grid item xs={12} md={3}>
                <div id="ModalIcon">
                  <Icon i={SelectedCrypto.symbol.toLowerCase()} size={80} />
                </div>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h3">{SelectedCrypto.name}</Typography>
                <Typography variant="h5" gutterBottom>
                  <NumberFormat
                    value={SelectedCrypto.supply}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={3}
                    suffix=" "
                  />
                  Circulating Supply
                </Typography>
              </Grid>
            </Grid>
            <Grid spacing={4} container>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <p>
                      <b> Current Value </b>{" "}
                    </p>

                    <NumberFormat
                      value={AppState.CalculatePrice(SelectedCrypto.priceUsd)}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" " + AppState.SelectedFiat}
                      decimalScale={2}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <p>
                      {" "}
                      <b> Market Cap </b>{" "}
                    </p>

                    <NumberFormat
                      value={AppState.CalculatePrice(
                        SelectedCrypto.marketCapUsd
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" " + AppState.SelectedFiat}
                      decimalScale={2}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <p>
                      {" "}
                      <b>24hr Volume </b>
                    </p>

                    <NumberFormat
                      value={SelectedCrypto.volumeUsd24Hr}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={3}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {SetSelectedCrypto !== "" ? (
              <Graph CryptoName={UseName} />
            ) : (
              <div />
            )}
            {/** */}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default observer(TableContainer);
