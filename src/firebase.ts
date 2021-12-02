import { initializeApp } from "firebase/app";
import {
  getFirestore,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { ToDoList } from "./interfaces";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAclayMlXKCrOLcHyIrAMorcGwPt1jFeUk",
  authDomain: "todo-8c363.firebaseapp.com",
  databaseURL:
    "https://todo-8c363-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-8c363",
  storageBucket: "todo-8c363.appspot.com",
  messagingSenderId: "1078915129239",
  appId: "1:1078915129239:web:d66149ea0124878dcaeed2",
  measurementId: "G-8T2WEN0T6H",
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
