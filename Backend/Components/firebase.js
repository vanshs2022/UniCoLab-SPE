const admin = require("firebase-admin");
const serviceAccount = require("/etc/secrets/unicolab-405f8-firebase-adminsdk-fbsvc-6b60ddcab3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;