import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebaseConfig";

// Criar conta
export async function cadastrar(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

// Fazer login
export async function login(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

// Logout
export async function logout() {
  return await signOut(auth);
}

// Usuário logado
export function usuarioAtual() {
  return auth.currentUser;
}