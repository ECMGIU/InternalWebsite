const functions = require("firebase-functions");
const { db } = require("./shared");

const tradesRef = db.collection("trades");

exports.ingestion = functions.https.onRequest((request, response) => {
  // TODO: Trade Ingestion Function
  // See logic in src/pages/TradesPage.jsx
  // eventually that will be abstracted here
});

exports.portfolio = functions.https.onRequest(async (request, response) => {
  const trades = await tradesRef.get();
  const portfolio = {};

  trades.docs.forEach((tr) => {
    // convert document to object
    const trade = tr.data();
    const { ticker } = trade;

    if (ticker in portfolio) {
      // If it exists, add this value
      portfolio[ticker] += parseFloat(trade.quantity);
    } else {
      // If it doesn't, create it with this value
      portfolio[ticker] = parseFloat(trade.quantity);
    }

    // If a portfolio item has a 0 or null quantity, remove it
    if (!portfolio[ticker] && portfolio[ticker] !== undefined) {
      delete portfolio[ticker];
    }
  });

  return response.status(200).send(portfolio);
});
