// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI0qRFhFtmsnzrdASpOuCer1i3hPNsxtY",
  authDomain: "robo-nao-app.firebaseapp.com",
  projectId: "robo-nao-app",
  storageBucket: "robo-nao-app.firebasestorage.app",
  messagingSenderId: "714140902929",
  appId: "1:714140902929:web:fb8dbb65395e04716e33b0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;