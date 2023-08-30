import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const updateEquipoFirestore = (mac, valores) => {
    setDoc(doc(db, "cigarrillos", mac), { valores }, { merge: true })
}