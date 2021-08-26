import React, { useEffect, useState, useContext } from "react";
import NavButton from "./NavButton";
import Grid from "@material-ui/core/Grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import { ApiCall } from "../Shared/ApiCall";
import AppStateContext from "../Shared/appState";
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

//displays graph in modal
const Graph = (props) => {
  const AppState = useContext(AppStateContext);
  //holds actual graph data
  const [GraphData, SetGraphData] = useState([]);
  //tracks which button is pressed
  const [ActiveButton, SetActiveButton] = useState("Day");
  
  useEffect(() => {
    if (props.CryptoName !== undefined) {
      //gets current timee
      var CurrDate = moment().unix();
      //gets time minus one day
      var CurrDateMinusOneDay = moment().subtract(1, "days").unix();
      //gets data for days graph
      GetGraphData(props.CryptoName, CurrDateMinusOneDay, CurrDate, "h1");
    }
  }, [props.CryptoName]);

  //function that keeps track which time frame/button was pressed
  //and gets the data approproate for the time frame
  const HandleButtonClick = (ButtonClicked) => {
    SetActiveButton(ButtonClicked);
    var CurrDate = moment().unix();
    var CurrDateMinusOneDay = "";

      if (ButtonClicked === "Day") {
        CurrDateMinusOneDay = moment().subtract(1, "days").unix();
        GetGraphData(props.CryptoName, CurrDateMinusOneDay, CurrDate, "h1");
      } else if (ButtonClicked === "Week") {
        CurrDateMinusOneDay = moment().subtract(7, "days").unix();
        GetGraphData(props.CryptoName, CurrDateMinusOneDay, CurrDate, "d1");
      } else if (ButtonClicked === "Month") {
        CurrDateMinusOneDay = moment().subtract(30, "days").unix();
        GetGraphData(props.CryptoName, CurrDateMinusOneDay, CurrDate, "d1");
      } else if (ButtonClicked === "Year") {
        CurrDateMinusOneDay = moment().subtract(365, "days").unix();
        GetGraphData(props.CryptoName, CurrDateMinusOneDay, CurrDate, "d1");
      }


  };

  //StartTime minus 1 day, endtime = current time
  //function that gets the actual data
  const GetGraphData = (Coin, StartTime, EndTime, Interval) => {
    ApiCall(
      "Get",
      `https://api.coincap.io/v2/assets/${Coin.toLowerCase()}/history?start=${
        StartTime * 1000
      }&end=${EndTime * 1000}&interval=${Interval}`
    ).then((results) => {
      if (results == "error")
      {
        AppState.OpenErrorSnackBar(true)
      } else {

      var QueryResults = results.data;
      var FormattedResults = [];

      QueryResults.forEach((row) => {
        /*this will format for days table */
        var NewDate = moment(row.time).format("MMM DD, YY H:mm");
        FormattedResults.push({
          date: NewDate,
          price: parseFloat(parseFloat(AppState.SelectedFiat === "USD" ? row.priceUsd : AppState.CalculatePrice(row.priceUsd) ).toFixed(3))
        });
      });
       
      SetGraphData(FormattedResults);

    }
     
    });
  };

  return (
    <>
      <Grid spacing={1} justify="flex-end" container>
        <Grid item>
          <NavButton
            ActiveButton={ActiveButton}
            HandleButtonClick={HandleButtonClick}
            ButtonText="Year"
          />
        </Grid>

        <Grid item>
          <NavButton
            ActiveButton={ActiveButton}
            HandleButtonClick={HandleButtonClick}
            ButtonText="Month"
          />
        </Grid>

        <Grid item>
          <NavButton
            ActiveButton={ActiveButton}
            HandleButtonClick={HandleButtonClick}
            ButtonText="Week"
          />
        </Grid>

        <Grid item>
          <NavButton
            ActiveButton={ActiveButton}
            HandleButtonClick={HandleButtonClick}
            ButtonText="Day"
          />
        </Grid>
      </Grid>
      <div className="ChartContainer">
 
        <ResponsiveContainer height={300} width="99%">
        <LineChart
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          data={GraphData}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line dot={false} dataKey="price" stroke="#008b8b" />
        </LineChart>
      </ResponsiveContainer>
        
        



        
      </div>
    </>
  );
};

export default Graph;
