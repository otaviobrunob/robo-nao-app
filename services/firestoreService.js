import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function salvarUsuario(usuario) {

  await setDoc(doc(db, "usuarios", usuario.uid), {

    nome: usuario.nome,
    email: usuario.email,
    tipo: "Terapeuta",
    dataCadastro: new Date()

  });

}