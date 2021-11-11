import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const firebase = initializeApp(config);
export const firestore = getFirestore(firebase);

export default firebase;
