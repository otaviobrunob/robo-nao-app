import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";

// Criar comando
export async function adicionarComando(comando) {

  await addDoc(collection(db, "comandos"), comando);

}

// Buscar comandos
export async function listarComandos() {

  const snapshot = await getDocs(collection(db, "comandos"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}

// Excluir
export async function excluirComando(id) {

  await deleteDoc(doc(db, "comandos", id));

}

// Atualizar
export async function atualizarComando(id, dados) {

  await updateDoc(doc(db, "comandos", id), dados);

}