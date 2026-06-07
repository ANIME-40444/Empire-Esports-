// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBOQ8QcnTCpn1batyt2GZZp_j388v4AUZY",
  authDomain: "empire-esports-c2925.firebaseapp.com",
  projectId: "empire-esports-c2925",
  storageBucket: "empire-esports-c2925.firebasestorage.app",
  messagingSenderId: "591810748218",
  appId: "1:591810748218:web:70544e53d24418332d3a03",
  measurementId: "G-YB6LG4QFWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Export Database
export { db };
