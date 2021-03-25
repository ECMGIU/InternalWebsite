const functions = require("firebase-functions");
const admin = require("firebase-admin");
const TastyWorks = require("tasty-works-api");

const { db } = require("./shared");

const tradesRef = db.collection("trades");
const portfoliosRef = db.collection("portfolios");

const accountNumber = "5WV99548";
const credentials = {
  username: "skeoleia@iu.edu",
  password: "envisioncapital",
};

const initTastyWorks = async () => {
  TastyWorks.setUser(credentials);

  const token = await TastyWorks.authorization();
  TastyWorks.setAuthorizationToken(token);

  TastyWorks.setUser({
    authorization_token: token,
  });
};

const toTastyWorksDateFormat = (date) => date.toISOString().split("T")[0];

const parseAction = (action) => {
  if (action.includes("BOUGHT") || action.includes("Buy")) {
    return "buy";
  } if (action.includes("DIVIDEND RECEIVED")) {
    return "dividend received";
  } if (action.includes("REINVESTMENT")) {
    return "reinvestment";
  } if (action.includes("DISTRIBUTION")) {
    return "distribution";
  } if (action.includes("EXPIRED")) {
    return "option expiration";
  }
  return "unknown"; // we should never get here
};

exports.ingestion = functions.https.onRequest(async (request, response) => {
  // connect to the tastyworks API
  await initTastyWorks();

  // grab the most recent trade document in the database
  // (this will give us our start date for where to pull new trades)
  const mostRecentTrade = await tradesRef
      .orderBy("date", "desc")
      .limit(1)
      .get();

  // Establish start and end dates for period of history to pull trades.
  let start;
  if (!mostRecentTrade.empty) {
    console.log(mostRecentTrade.docs[0].get("date"));
    start = toTastyWorksDateFormat(
        mostRecentTrade.docs[0]
            .get("date")
            .toDate(),
    );
  } else {
    start = "2000-1-1";
  }
  const end = toTastyWorksDateFormat(new Date());

  // pull historical data from tastyworks
  let trades = await TastyWorks.history(accountNumber, start, end);

  // filter out trades without a symbol
  trades = trades.filter((tr) => tr.symbol !== undefined);

  // map every record into an object of our format
  trades = trades.map((tr) => ({
    date: admin.firestore.Timestamp.fromDate(new Date(tr["executed-at"])),
    ticker: tr.symbol.toUpperCase(),
    action: tr.action ? parseAction(tr.action) : "unknown",
    commission: parseFloat(tr.commission),
    quantity: parseFloat(tr.quantity),
    price: parseFloat(tr.price),
    fees: parseFloat(tr["clearing-fees"]),
    amount: parseFloat(tr.value),
    // is this always positive or should it be net-value
  }));

  const batch = db.batch();
  trades.forEach((tr) => {
    batch.set(tradesRef.doc(), tr, { merge: true });
  });
  batch.commit();

  return response.status(200).send(trades.length.toString());
});


