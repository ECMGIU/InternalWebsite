const functions = require("firebase-functions");
const admin = require("firebase-admin");
const TastyWorks = require("tasty-works-api");

const { db } = require("./shared");

const tradesRef = db.collection("trades");
const portfoliosRef = db.collection("portfolios");

const tastyworksConfig = functions.config().tastyworks;

const accountNumber = tastyworksConfig.username;
const credentials = {
  username: tastyworksConfig.username,
  password: tastyworksConfig.password,
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

const parseAction = (action, type, subtype) => {
  if (action.includes("BOUGHT") || action.includes("Buy")) {
    return "buy";
  } if (action.includes("DIVIDEND RECEIVED") || subtype.includes("Dividend")) {
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
  /* return response.status(200).send(
      `<pre>${JSON.stringify(trades, null, 2)}</pre>`,
  );*/

  // filter out trades without a symbol
  trades = trades.filter((tr) => tr.symbol !== undefined);

  // map every record into an object of our format
  trades = trades.map((tr) => ({
    date: admin.firestore.Timestamp.fromDate(new Date(tr["executed-at"])),
    ticker: tr.symbol.toUpperCase(),
    action: parseAction(
        tr.action ? tr.action : "",
        tr["transaction-type"] ? tr["transaction-type"] : "",
        tr["transaction-sub-type"] ? tr["transaction-sub-type"] : "",
    ),
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
