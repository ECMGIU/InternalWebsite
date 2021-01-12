const functions = require("firebase-functions");
const { db } = require("./shared");

const tradesRef = db.collection("trades");

exports.ingestion = functions.https.onRequest((request, response) => {
  // TODO: Trade Ingestion Function
});

exports.portfolio = functions.https.onRequest((request, response) => {
  const trades = tradesRef.get();
  return response.status(200).send(trades);
});
