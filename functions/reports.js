const functions = require("firebase-functions");
const path = require("path");
const os = require("os");
const fs = require("fs");
const Busboy = require("busboy");
const { finished } = require("stream");
const { Storage } = require("@google-cloud/storage");

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
    //Upload function here

    const storage = new Storage();
    async function generateV4UploadSignedUrl() {

      const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: "application/octet-stream",
      };

      const [url] = await storage
        .bucket(bucketName)
        .file(filename)
        .getSignedUrl(options);

      console.log("Generated PUT signed URL:");
      console.log(url);
      console.log("You can use this URL with any user agent, for example:");
      console.log(
        "curl -X PUT -H 'Content-Type: application/octet-stream' " +
          `--upload-file my-file '${url}'`
      );
    }

    generateV4UploadSignedUrl().catch(console.error);
  });
});
