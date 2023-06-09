import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2JpG2UIhPyxOk6dzVAo79sVDnILPmkRg",
    authDomain: "tinder-clone-76c43.firebaseapp.com",
    projectId: "tinder-clone-76c43",
    storageBucket: "tinder-clone-76c43.appspot.com",
    messagingSenderId: "798289033174",
    appId: "1:798289033174:web:b217b3fe9455a5698b1677"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const store = getFirestore()
const storage = getStorage()

export { auth, store, storage };