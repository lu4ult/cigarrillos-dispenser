import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfigGuillermoFagnani = {
  apiKey: "AIzaSyC11D2sfAcgdXXqm0L3MWlpmuHXzNdfnnQ",
  authDomain: "guillermo-fagnani.firebaseapp.com",
  projectId: "guillermo-fagnani",
  storageBucket: "guillermo-fagnani.appspot.com",
  messagingSenderId: "431294081579",
  appId: "1:431294081579:web:237d8857f0f5f2e8df986e"
};


const firebaseConfigCasita = {
  apiKey: "AIzaSyDwNDFrkLes2vscGOGFMnbdrXalnhGeOo8",
  authDomain: "casita-b7d81.firebaseapp.com",
  databaseURL: "https://casita-b7d81-default-rtdb.firebaseio.com",
  projectId: "casita-b7d81",
  storageBucket: "casita-b7d81.appspot.com",
  messagingSenderId: "98983378357",
  appId: "1:98983378357:web:173fe784fbc1c8ffa7adfc"
};


const firebaseConfigProd = {
  apiKey: "AIzaSyBS4mW1eKBxOxnSQRkct5p9OkasidCJ9c4",
  authDomain: "cigarrillos-dispenser-app.firebaseapp.com",
  projectId: "cigarrillos-dispenser-app",
  storageBucket: "cigarrillos-dispenser-app.appspot.com",
  messagingSenderId: "1010897077022",
  appId: "1:1010897077022:web:436047ba8de4d1e48dff0f"
};

const app = initializeApp(firebaseConfigProd);
export const db = getFirestore(app);