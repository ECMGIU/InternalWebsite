# ECMG Internal Website Planning <!-- omit in toc -->

- [1. Stack](#1-stack)
- [2. Querys](#2-querys)
  - [2.1. Report Queries](#21-report-queries)
  - [2.2. User Queries](#22-user-queries)
  - [2.3. Trade Queries](#23-trade-queries)
  - [2.4. Cross-Collection Queries](#24-cross-collection-queries)
- [3. Functions](#3-functions)

## 1. Stack
- Frontend: React ([Next.js](https://nextjs.org/))

- Hosting: [Firebase Hosting](https://firebase.google.com/products/hosting)

- Database: [Cloud Firestore](https://firebase.google.com/products/firestore)

- Storage: [Firebase Storage](https://firebase.google.com/products/storage)

  Used for report and image uploads, since we can't write files directly to the database.

- Serverless Functions: [Cloud Functions](https://firebase.google.com/products/functions)

  Used to automate common processes without having to stand up a dedicated server/API. Examples: Cleaning Fidelity CSVs, Collecting and Saving Historical Data, and saving reports to Storage and Metadata to Cloud Firestore in one API call.

- Authentication: [Firebase Authentication](https://firebase.google.com/products/auth)

  This is the real selling point because authentication with SAML is super simple, letting us tie right in with Duo and the rest of IU SAML.

- Analytics: [Google Analytics](https://firebase.google.com/products/analytics)

  Ties in real nice with Firebase, so why not?


## 2. Querys
Since we're using a NoSQL database (Cloud Firestore), rather than designing a database based on entities, (as we would with a relational database,) our design is rooted in our queries.

- https://www.dataversity.net/how-to-design-schema-for-your-nosql-database/

### 2.1. Report Queries
- Recent Reports
- Reports for given trade
- Reports for a given ticker
- Reports for a given user
- Reports for a given team (I'm using team rather than sector/portfolio.)
- Metadata for a given Report
- Feedback for a given Report

### 2.2. User Queries
- Role for given user
- Get all members of a team ([may need a Team collection](https://medium.com/firebase-developers/how-to-build-a-team-based-user-management-system-with-firebase-6a9a6e5c740d))
- Get current team of a given user

### 2.3. Trade Queries
- Currently open positions
- Current profit of open positions

### 2.4. Cross-Collection Queries
- Analyst performance
- Team performance

## 3. Functions