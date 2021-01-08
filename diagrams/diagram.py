from diagrams import Diagram
from diagrams.custom import Custom
from diagrams.firebase.develop import *
from diagrams.gcp.compute import Functions
from diagrams.gcp.database import Firestore
from diagrams.gcp.storage import Storage
from diagrams.programming.framework import React

graph_attr = {
    "pad": "1.0",
    "splines": "curved",
}

with Diagram(filename="build/trade_ingestion", show=False, graph_attr=graph_attr):
    Fidelity = Custom("Fidelity", "../custom_icons/fidelity.png")

    Fidelity >> Functions("Trade Ingestion Function") >> Firestore("Trades")

with Diagram(filename="build/report_ingestion", show=False, graph_attr=graph_attr):
    func = Functions("Report Ingestion Function")
    discord = Custom("Discord", "../custom_icons/discord.png")

    React("Next.js Frontend") >> func >> Storage("Reports")
    discord >> func >> Firestore("Reports")

with Diagram(
    filename="build/historical_data_ingestion", show=False, graph_attr=graph_attr
):
    func = Functions("Historical Data\n Ingestion Function")
    quandl = Custom("Quandl", "../custom_icons/quandl.png")
    yf = Custom("Yahoo! Finance", "../custom_icons/yahoo.jpg")

    quandl >> func
    yf >> func

    func >> Firestore("Historical Data")
