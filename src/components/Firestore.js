import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

// export const updateRaiInFirestore = (rai, id) => {
//     setDoc(doc(db, "RAI", id), rai, { merge: true });
// }

// export const updateRaiConfigInFirestore = (id, valores) => {
//     setDoc(doc(db, "RAI", id), { 'config': valores }, { merge: true });
// }