// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB38eIUSprbvXOClB1wo6i864td4RTsoY4",
  authDomain: "scanme-842e6.firebaseapp.com",
  projectId: "scanme-842e6",
  storageBucket: "scanme-842e6.firebasestorage.app",
  messagingSenderId: "455422006608",
  appId: "1:455422006608:web:acc2c3f2f87d28373f8855",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, app, db };
