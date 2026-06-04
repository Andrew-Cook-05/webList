import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // values from Firebase
    apiKey: "AIzaSyB6XzHqfuZwfL3jEO_6dI6HtCTP50L5Lqs",
    authDomain: "weblist-f9f58.firebaseapp.com",
    projectId: "weblist-f9f58",
    storageBucket: "weblist-f9f58.firebasestorage.app",
    messagingSenderId: "970532229391",
    appId: "1:970532229391:web:093b0956b6a4ca60d56e7a",
    measurementId: "G-YRV3SZ5B9G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);