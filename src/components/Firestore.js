import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const updateEquipoFirestore = (mac, valores) => {
    setDoc(doc(db, "cigarrillos", mac), valores, { merge: true })
}

export const updateHistorialFirestore = (id, objeto) => {
    setDoc(doc(db, "historial-cigarros", id), objeto)
}

export const updateDatosActualesFirestore = (mac, objeto) => {
    setDoc(doc(db, "cigarrillos", mac), { valores: objeto }, { merge: true });
}