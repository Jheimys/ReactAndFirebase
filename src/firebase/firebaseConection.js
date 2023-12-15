import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUlezsS4e-v1N5FTqmzmEl9NZKIJjVfwA",
  authDomain: "jamesteste-11a1e.firebaseapp.com",
  projectId: "jamesteste-11a1e",
  storageBucket: "jamesteste-11a1e.appspot.com",
  messagingSenderId: "550123566332",
  appId: "1:550123566332:web:810fb8afe912034bd91379",
  measurementId: "G-23RRBSR8BX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
