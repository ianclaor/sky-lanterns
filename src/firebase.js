import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCghErfQCsRAw886awMz9CtzwbJtMdmZz4",
  authDomain: "sky-lanterns-19ac4.firebaseapp.com",
  projectId: "sky-lanterns-19ac4",
  storageBucket: "sky-lanterns-19ac4.firebasestorage.app",
  messagingSenderId: "732395717247",
  appId: "1:732395717247:web:c427ff591babb1b831b54a",
  measurementId: "G-GQK0W6JHM5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);