// Firebase Admin SDK — verifies the phone-auth ID token issued to the client.
// Requires a service account key. Configure in .env:
//   FIREBASE_SERVICE_ACCOUNT_PATH=firebase-service-account.json  (relative to the server folder)
// Download it from Firebase Console -> Project settings -> Service accounts -> Generate new private key.

const path = require('path');
const admin = require('firebase-admin');

let initialized = false;
const credPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (credPath) {
    try {
        const resolved = path.isAbsolute(credPath)
            ? credPath
            : path.resolve(__dirname, '../../', credPath); // relative to server/
        const serviceAccount = require(resolved);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        initialized = true;
        console.log('[firebase] Admin SDK initialized.');
    } catch (err) {
        console.warn('[firebase] Could not initialize Admin SDK:', err.message);
        console.warn('[firebase] Password reset will be disabled until a valid service account key is provided.');
    }
} else {
    console.log('[firebase] FIREBASE_SERVICE_ACCOUNT_PATH not set - phone-auth password reset disabled.');
}

const isConfigured = () => initialized;

// Verifies the client ID token and returns its decoded claims (incl. phone_number).
async function verifyIdToken(idToken) {
    return admin.auth().verifyIdToken(idToken);
}

module.exports = { isConfigured, verifyIdToken };
