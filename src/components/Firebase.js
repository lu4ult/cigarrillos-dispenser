import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC11D2sfAcgdXXqm0L3MWlpmuHXzNdfnnQ",
  authDomain: "guillermo-fagnani.firebaseapp.com",
  projectId: "guillermo-fagnani",
  storageBucket: "guillermo-fagnani.appspot.com",
  messagingSenderId: "431294081579",
  appId: "1:431294081579:web:237d8857f0f5f2e8df986e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);