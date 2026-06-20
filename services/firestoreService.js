import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../firebaseConfig";

// Salvar usuário
export async function salvarUsuario(usuario) {

  await setDoc(doc(db, "usuarios", usuario.uid), {

    nome: usuario.nome,
    email: usuario.email,
    telefone: "",
    instituicao: "",
    tipo: "Terapeuta",
    dataCadastro: new Date()

  });

}

// Atualizar usuário
export async function atualizarUsuario(uid, dados) {

  await updateDoc(
    doc(db, "usuarios", uid),
    dados
  );

}

// Excluir usuário
export async function excluirUsuario(uid) {

  await deleteDoc(
    doc(db, "usuarios", uid)
  );

}