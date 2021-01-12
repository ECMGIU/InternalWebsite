const functions = require("firebase-functions");
const axios = require("axios");
const { db } = require("./shared");

exports.ingestion = functions.https.onRequest((request, response) => {
  // This is confusing syntax, but its synonymous to the following:
  // const ticker = request.query.ticker;
  const { ticker } = request.query;

  // Create a reference to the Document for the ticker in question.
  // If it doesn't exist, it'll still point to a theoretical document,
  // but nothing's there until we run tickerRef.set() below.
  const tickerRef = db.collection("tickers").doc(ticker);

  axios.get(`https://autoc.finance.yahoo.com/autoc?lang=en&query=${ticker}`)
      .then((res) => {
        // Grab the first result from the response
        const result = res.data.ResultSet.Result[0];

        // Make sure we've got the exact ticker we want, and it actually exists
        if (result && result.symbol === ticker.toUpperCase()) {
          // Save the new data in the 'tickers' collection
          tickerRef.set({
            ticker: result.symbol,
            name: result.name,
            exchange: result.exchDisp,
            type: result.typeDisp,
          }, {
            // If the record exists, update it with this info
            merge: true,
          });

          response.status(200).send("Done.");
        } else {
          response.status(404).send(`Not Found: ${ticker}`);
        }
      }).catch((error) => {
        response.status(500).send(`Error: ${error.message}`);
      });
});
