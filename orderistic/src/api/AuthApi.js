import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

// Grabbing all food information for front-end purposes
export async function addStaff(email) {
  await addDoc(collection(db, "staff"), {
    email: email,
  });
}

export async function validStaff(email) {
  const q = collection(db, "staff");
  let valid = false;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (email == doc.data()["email"]) {
      console.log("entered here");
      valid = true;
    }
  });
  return valid;
}
