const functions = require("firebase-functions");
const yahooFinance = require("yahoo-finance");

const { db } = require("./shared");

const tickersRef = db.collection("tickers");


exports.ingestion = functions.https.onRequest(async (request, response) => {
  const { ticker, startDate, endDate } = request.query;

  let data = await yahooFinance.historical({
    symbol: ticker,
    from: startDate,
    to: endDate,
    period: "d",
  });

  if (!data) {
    return response.status(404);
  }

  data = data.map((d) => {
    const doc = {
      date: new Date(d.date),
      ...d,
    };
    delete doc.symbol;
    return doc;
  });

  const batch = db.batch();

  data.forEach((d) => {
    const { date, ...doc } = d;
    const ref = tickersRef
        .doc(ticker)
        .collection("historical-data")
        .doc(date.toISOString().slice(0, 9));
    batch.set(ref, doc);
  });

  batch.commit();

  return response.status(200);
});
