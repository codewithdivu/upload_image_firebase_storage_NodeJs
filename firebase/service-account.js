const admin = require("firebase-admin");

const serviceAccount = require("../service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});

const firebase = admin.storage().bucket();

module.exports = { firebase };
