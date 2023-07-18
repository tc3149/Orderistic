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
export async function returnFoodData() {
  const docRef = await getDocs(collection(db, "menu"));
  const foodMenu = {};
  
  docRef.forEach((doc) => {
    // object holder so I can alter
    let foodInfo = doc.data();
    foodMenu[doc.id] = foodInfo;
  });
  return foodMenu;
}

// For the given ID, return the data of the food
export async function returnSpecificFood(id) {
  const docRef = await getDocs(collection(db, "menu"));
  docRef.forEach((doc) => {

    // if the specific ID matches the current one, return data
    if (id === doc.id) {
      console.log(doc.data());
      return doc.data();
    }
  });

  // otherwise, no matches are found and return an empty dictionary
  return {};
}

//Allows all users to view the menu HIMMY-19
export async function ViewMenu() {
  const q = collection(db, "menu");
  console.log("Grabbing Items");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  
}

//Allows staff to add items to the menu HIMMY-20
export async function AddItem(item) {
  const res = await addDoc(collection(db, 'menu'), item);
  console.log('Added document with ID: ', res.id);
  return res.id;
}

//Allows staff to remove items from the menu HIMMY-22
export async function RemoveItem(id) {
  const res = await deleteDoc(doc(db, 'menu', id));
  console.log('Removed document with ID: ', id);
}

//Allows staff to update items on the menu HIMMY-21
export async function UpdateItem(id, item) {
  const res = await setDoc(doc(db, 'menu', id), item);
  console.log('Updated document with ID: ', id);
}


// Given a food ID, returns the average time for the dish
export async function dishTime(itemID) {
  const docRef = doc(db, "menu", itemID);
  const docData = await getDoc(docRef);

  // return the average time of all orders
  const timeArray = docData.data()["time"];
  return Math.floor(timeArray.reduce((a, b) => a + b, 0) / timeArray.length);
}
