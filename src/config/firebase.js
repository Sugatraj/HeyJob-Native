import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbS5BGv1ZtlK0oCVPkIz3zni-F-s-nkGc",
  authDomain: "heyjob-testing-01.firebaseapp.com",
  databaseURL: "https://heyjob-testing-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heyjob-testing-01",
  storageBucket: "heyjob-testing-01.firebasestorage.app",
  messagingSenderId: "738620623490",
  appId: "1:738620623490:web:a8f2414939586105e6029b",
  measurementId: "G-W5YDSQHF2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth }; 