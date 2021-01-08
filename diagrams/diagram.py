from diagrams import Diagram
from diagrams.custom import Custom
from diagrams.firebase.develop import *
from diagrams.programming.framework import React

graph_attr = {
    "pad": "1.0",
    "splines": "curved",
}

with Diagram(filename="trade_ingestion", show=False, graph_attr=graph_attr):
    Fidelity = Custom("Fidelity", "custom_icons/fidelity.png")

    Fidelity >> Functions("Trade Ingestion Function") >> Firestore("Trades")

with Diagram(filename="report_ingestion", show=False, graph_attr=graph_attr):
    func = Functions("Report Ingestion Function")
    discord = Custom("Discord", "custom_icons/discord.png")

    React("Next.js Frontend") >> func >> Storage("Reports")
    discord >> func >> Firestore("Reports")
