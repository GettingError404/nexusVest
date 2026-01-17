import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyMockKeyForBuild12345",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-app.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-app",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-app.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
   app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
   auth = getAuth(app);
   db = getFirestore(app);
} catch (e) {
    console.warn("Firebase Init Failed (Using mock placeholders):", e);
    // @ts-ignore
    app = { name: "[DEFAULT-MOCK]", options: firebaseConfig };
    // @ts-ignore
    auth = { currentUser: null, onAuthStateChanged: () => () => {} };
    // @ts-ignore
    db = { type: "firestore-mock" };
}

export { app, auth, db };
