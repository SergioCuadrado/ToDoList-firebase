import { initializeApp } from "firebase/app";
import {
  getFirestore,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { ToDoList } from "./components/interfaces";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const firestore = getFirestore();

// Write the information into the database
export async function addANewDocument({ name, isDone }: ToDoList) {
  const OrderTodo = doc(firestore, `todos/${name}`);
  const docData = {
    name,
    isDone,
  };
  setDoc(OrderTodo, docData);
}

// Update data if you done the task
export async function updateADocument(name: string, isDone: boolean) {
  const OrderTodo = doc(firestore, `todos/${name}`);

  await updateDoc(OrderTodo, {
    isDone,
  });
}

export async function deleteADocument(name: string) {
  const OrderTodo = doc(firestore, `todos/${name}`);

  await deleteDoc(OrderTodo);
}
