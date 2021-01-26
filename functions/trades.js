const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { db } = require("./shared");

const tradesRef = db.collection("trades");
const portfoliosRef = db.collection("portfolios");

exports.ingestion = functions.https.onRequest((request, response) => {
  // TODO: Trade Ingestion Function
  // See logic in src/pages/TradesPage.jsx
  // eventually that will be abstracted here
});

exports.portfolio = functions.https.onCall(async (request, response) => {
  let trades;
  let portfolio;

  // Get the most recently created portfolio
  const portfolios = await portfoliosRef
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

  // If a portfolio exists,
  if (!portfolios.empty) {
    // that's the starting point for our new portfolio,
    portfolio = portfolios.docs[0].data().contents;

    // and we only want trades since we generated it.
    trades = await tradesRef.where(
        "createdAt", ">", portfolios.docs[0].data().createdAt,
    ).get();
    // This creates the important caveat that if we upload trades that aren't
    // chronologically sequential, we'll need to rebuild from scratch.
  } else {
    // Otherwise, start with an empty portfolio and all the trades.
    portfolio = {};
    trades = await tradesRef.get();
  }

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

  // Create a document in the portfolios collection showing the portfolio at
  // this point in time.
  await portfoliosRef.add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    contents: portfolio,
  });
});
