// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtZdS3l7HDA3a5uXy7D2agQSTJxmafY1c",
  authDomain: "buqd-c068f.firebaseapp.com",
  databaseURL:
    "https://buqd-c068f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "buqd-c068f",
  storageBucket: "buqd-c068f.appspot.com",
  messagingSenderId: "923713591774",
  appId: "1:923713591774:web:519c33176e3062d2cc254f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);

export default app;

export { db };
