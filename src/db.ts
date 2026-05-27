import admin from "firebase-admin";
import serviceaccount from "./accountkey.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceaccount as admin.ServiceAccount),
});

const db = admin.firestore();
export default db;
