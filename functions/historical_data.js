const functions = require("firebase-functions");

const axios = require("axios");

const { db } = require("./shared");

exports.ingestion = functions.https.onRequest((request, response) => {
  const { ticker, startDate, endDate } = request.query;

  const historicalDataRef = db.collection("historical_data");

  const tickerHistoricalDataRef = historicalDataRef.doc(ticker).collection("data");

  axios.get(`https://autoc.finance.yahoo.com/autoc?lang=en&query=${ticker}`)
      .then((res) => {

        const result = res.data.ResultSet.Result[0];

        
        if (result && result.symbol === ticker.toUpperCase()) {
          
          tickerRef.set({date: result.date, Open: result.Open, Low: result.Low, High: result.High, Close: result.Close, Volume: result.Volume}, 
            {merge: true,});

          response.status(200).send("Done.");
        } else {
          response.status(404).send(`Not Found: ${ticker}`);
        }
      }).catch((error) => {
        response.status(500).send(`Error: ${error.message}`);
      });
});
