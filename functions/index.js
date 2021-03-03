// Functions are exported in groups in our implementation

// Export all functions in trades.js prefixed with trades-{function}
exports.trades = require("./trades");

// Export everything else
exports.historical_data = require("./historical_data");
exports.tickers = require("./tickers");

// As additional functions are added, they'll need to be linked here.
