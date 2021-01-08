from diagrams import Diagram
from diagrams.custom import Custom
from diagrams.firebase.develop import *
from diagrams.programming.framework import React

with Diagram("Trade Ingestion", show=False):
    Fidelity = Custom("Fidelity", "custom_icons/fidelity.png")

    Fidelity >> Functions("Trade Ingestion Function") >> Firestore("Trades")

with Diagram("Report Ingestion", show=False):
    func = Functions("Report Ingestion Function")
    discord = Custom("Discord", "custom_icons/discord.png")

    React("Next.js Frontend") >> func >> Storage("Reports")
    discord >> func >> Firestore("Reports")
