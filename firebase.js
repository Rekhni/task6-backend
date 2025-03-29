const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config();

const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString('utf-8'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40collaborative-presentati-53894.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
module.exports = db;