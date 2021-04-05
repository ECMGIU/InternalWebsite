const functions = require("firebase-functions");
const yahooFinance = require('yahoo-finance');
const axios = require("axios");

const { db } = require("./shared");

exports.ingestion = functions.https.onRequest(async (request, response) => {
  const { ticker, startDate, endDate } = request.query;

  const historicalDataRef = db.collection("historical_data");
  const tickerHistoricalDataRef = historicalDataRef.doc(ticker).collection("data");

  const data = await yahooFinance.historical({
    symbol: ticker,
    from: startDate,
    to: endDate,
    period: 'd'
  })

  return response.status(200).send(data)
});
