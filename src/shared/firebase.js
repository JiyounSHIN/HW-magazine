import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    // Import the functions you need from the SDKs you need

    apiKey: "AIzaSyAMlf798yh6OUEpPCEu52ggU8WeNdjGnX4",
    authDomain: "hw-magazine.firebaseapp.com",
    projectId: "hw-magazine",
    storageBucket: "hw-magazine.appspot.com",
    messagingSenderId: "79540320408",
    appId: "1:79540320408:web:f2a75cf3973abe5930b8ed",
    measurementId: "G-GC8HMBFMX0"

};

const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;