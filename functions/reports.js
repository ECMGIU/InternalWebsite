const functions = require("firebase-functions");
const path = require("path");
const os = require("os");
const fs = require("fs");
const Busboy = require("busboy");
const { finished } = require("stream");

exports.ingestion = functions.https.onRequest((request, response) => {
  if (req.method !== "POST") {
    // Return a "method not allowed" error
    return res.status(405).end();
  }

  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  const fields = {};
  const uploads = {};

  busboy.on("field", (fieldname, val) => {
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });
  const fileWrites = [];

  busboy.on("file", (fieldname, file, filename) => {
    file.on("data", (data) => {
      uploads["file"] = data;
    });
    file.on("end", () => {
      uploads["filename"] = filename;
    });
  });
  busboy.on("finish", () => {
    
  })
});
