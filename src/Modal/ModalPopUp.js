import React, { useEffect, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Graph from "./Graph";
import CardContent from "@material-ui/core/CardContent";
import AppStateContext from "../Shared/appState"
import { Icon } from "coinmarketcap-cryptocurrency-icons";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";


//parent modal that hold a summary of coin data
const ModalPopUp = (props) => {
      const AppState = useContext(AppStateContext)
        return (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.OpnModal}
            onClose={props.CloseModal}
            className="ModalStyle"
          >
            <Fade in={props.OpnModal} timeout={250}>
              <Paper
                classes={{
                  root: props.IsMobile ? "ModalPaper ModalPaperMoble" : "ModalPaper"
                }}
              >
                {" "}
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <div id="ModalIcon">
                      <Icon i={props.SelectedCrypto.symbol.toLowerCase()} size={80} />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3">{props.SelectedCrypto.name}</Typography>
                    <Typography variant="h5" gutterBottom>
                      <NumberFormat
                        value={props.SelectedCrypto.supply}
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
                          value={AppState.CalculatePrice(props.SelectedCrypto.priceUsd)}
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
                            props.SelectedCrypto.marketCapUsd
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
                          value={props.SelectedCrypto.volumeUsd24Hr}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={3}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                {props.SelectedCrypto.id !== "" ? (
                  <Graph CryptoName={props.SelectedCrypto.id} />
                ) : (
                  <div />
                )}
                {/** */}
              </Paper>
            </Fade>
          </Modal>
        )
}

export default ModalPopUp