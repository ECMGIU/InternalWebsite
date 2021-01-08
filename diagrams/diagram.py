from diagrams import Diagram
from diagrams.custom import Custom
from diagrams.firebase.develop import *
from diagrams.programming.framework import React
from diagrams.saas.chat import Discord

graph_attr = {
    "pad": "1.0",
    "splines": "curved",
}

with Diagram(filename="build/trade_ingestion", show=False, graph_attr=graph_attr):
    Fidelity = Custom("Fidelity", "../custom_icons/fidelity.png")
    func = Functions("Trade Ingestion\n Function")
    trades = Firestore("Trades")

    Fidelity >> func >> trades

with Diagram(filename="build/report_ingestion", show=False, graph_attr=graph_attr):
    discord = Discord("Discord Server")

    func = Functions("Report Ingestion\n Function")

    files = Storage("Reports (Files)")
    meta = Firestore("Reports (Metadata)")

    [discord] >> func >> [files, meta]
    files >> meta

with Diagram(
    filename="build/historical_data_ingestion", show=False, graph_attr=graph_attr
):
    Quandl = Custom("Quandl", "../custom_icons/quandl.png")
    YahooFinance = Custom("Yahoo! Finance", "../custom_icons/yahoo.jpg")
    func = Functions("Historical Data\n Ingestion Function")
    historical = Firestore("Historical Data")

    [Quandl, YahooFinance] >> func >> historical

with Diagram(filename="build/ticker_ingestion", show=False, graph_attr=graph_attr):
    YahooFinance = Custom("Yahoo! Finance", "../custom_icons/yahoo.jpg")
    func = Functions("Ticker Data\n Ingestion Function")
    ticker = Firestore("Ticker Data")

    YahooFinance >> func >> ticker

with Diagram(filename="build/auth", show=False, graph_attr=graph_attr):
    IU = Custom("IU SAML 2.0", "../custom_icons/iu.jpg")
    react = React("React Frontend")
    Duo = Custom("Duo Security", "../custom_icons/duo.png")
    auth = Authentication("Firebase Auth")

    react - auth - IU - Duo

with Diagram(
    filename="build/main",
    show=False,
    graph_attr={
        "pad": "1.0",
        "splines": "curved",
    },
):
    Fidelity = Custom("Fidelity", "../custom_icons/fidelity.png")
    IU = Custom("IU SAML 2.0", "../custom_icons/iu.jpg")
    Quandl = Custom("Quandl", "../custom_icons/quandl.png")
    YahooFinance = Custom("Yahoo! Finance", "../custom_icons/yahoo.jpg")
    d3js = Custom("D3.js", "../custom_icons/d3js.png")

    trade_func = Functions("Trade Ingestion\n Function")
    report_func = Functions("Report Ingestion\n Function")
    hist_func = Functions("Historical Data\n Ingestion Function")
    ticker_func = Functions("Ticker Data\n Ingestion Function")

    portfolio_update_func = Functions("Discord Portfolio\n Update Function")

    auth = Authentication("Firebase Auth")

    discord = Discord("Discord Server")

    historical = Firestore("Historical Data")
    meta = Firestore("Reports (Metadata)")
    trades = Firestore("Trades")
    ticker = Firestore("Ticker Data")

    files = Storage("Reports (Files)")

    react = React("React Frontend")

    # ingestion flows
    Fidelity >> trade_func >> trades
    [Quandl, YahooFinance] >> hist_func >> historical
    [discord, react] >> report_func >> [files, meta]
    YahooFinance >> ticker_func >> ticker

    # auth flow
    react >> auth << IU

    # access flows
    [historical, trades] >> d3js >> react
    meta >> files
    [trades, ticker] >> react
    react << meta

    # output flows
    trades >> portfolio_update_func >> discord
