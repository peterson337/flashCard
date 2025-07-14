import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID,
//   measurementId: process.env.NEXT_PUBLIC_MENSURAMENTID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyClDzn1nAfvuRzlVzH4I71QNiks3prmDqk",
  authDomain: "lista-de-tarefas-2e5f8.firebaseapp.com",
  projectId: "lista-de-tarefas-2e5f8",
  storageBucket: "lista-de-tarefas-2e5f8.firebasestorage.app",
  messagingSenderId: "967828789473",
  appId: "1:967828789473:web:7a0ae881aa7fae4af07fa0",
  measurementId: "G-Z46EYN0FJF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
