import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  logout,
  usuarioAtual,
  excluirConta
} from "../services/authService";
import {
  atualizarUsuario,
  excluirUsuario
} from "../services/firestoreService";

export default function PerfilScreen({ navigation }) {

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {

    try {

      const authUser = usuarioAtual();

      if (!authUser) {
        navigation.replace("Login");
        return;
      }

      const documento = await getDoc(
        doc(db, "usuarios", authUser.uid)
      );

if (documento.exists()) {

    const dados = documento.data();

    setUsuario(dados);

    setNome(dados.nome || "");

    setTelefone(dados.telefone || "");

    setInstituicao(dados.instituicao || "");

}

    } catch (error) {

      Alert.alert("Erro", error.message);

    } finally {

      setLoading(false);

    }

  }

  async function salvarPerfil() {

  try {

    const authUser = usuarioAtual();

    await atualizarUsuario(authUser.uid, {

      nome,
      telefone,
      instituicao

    });

    Alert.alert(
      "Sucesso",
      "Perfil atualizado com sucesso!"
    );

    carregarUsuario();

  } catch (error) {

    Alert.alert(
      "Erro",
      error.message
    );

  }

}

async function excluirPerfil() {

  Alert.alert(
    "Excluir Conta",
    "Deseja realmente excluir sua conta?",

    [
      {
        text: "Cancelar",
        style: "cancel"
      },

      {
        text: "Excluir",
        style: "destructive",

        onPress: async () => {

          try {

            const authUser = usuarioAtual();

            // Remove o perfil do Firestore
            await excluirUsuario(authUser.uid);

            // Remove o usuário do Firebase Authentication
            await excluirConta();

            Alert.alert(
              "Conta excluída",
              "Sua conta foi removida com sucesso."
            );

            navigation.replace("Login");

          } catch (error) {

            Alert.alert(
              "Erro",
              error.message
            );

          }

        }

      }

    ]

  );

}

  async function sair() {

    await logout();

    navigation.replace("Login");

  }

  if (loading) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator size="large" color="#1565C0" />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        👤 Perfil do Terapeuta
      </Text>

<View style={styles.card}>

  <Text style={styles.label}>Nome</Text>

  <TextInput
    style={styles.input}
    value={nome}
    onChangeText={setNome}
  />

  <Text style={styles.label}>Telefone</Text>

  <TextInput
    style={styles.input}
    value={telefone}
    onChangeText={setTelefone}
    placeholder="Informe o telefone"
  />

  <Text style={styles.label}>Instituição</Text>

  <TextInput
    style={styles.input}
    value={instituicao}
    onChangeText={setInstituicao}
    placeholder="Informe a instituição"
  />

  <Text style={styles.label}>E-mail</Text>
  <Text style={styles.value}>{usuario?.email}</Text>

  <Text style={styles.label}>Tipo</Text>
  <Text style={styles.value}>{usuario?.tipo}</Text>

</View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Comandos")}
      >

<TouchableOpacity
  style={styles.button}
  onPress={salvarPerfil}
>

  <Text style={styles.buttonText}>
    💾 Atualizar Perfil
  </Text>

</TouchableOpacity>

        <Text style={styles.buttonText}>
          🤖 Controlar Robô
        </Text>

<TouchableOpacity
  style={styles.deleteButton}
  onPress={excluirPerfil}
>

  <Text style={styles.deleteText}>
    🗑 Excluir Perfil
  </Text>

</TouchableOpacity>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logout}
        onPress={sair}
      >

        <Text style={styles.logoutText}>
          Sair
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F5F7"
  },

  container: {
    flex: 1,
    backgroundColor: "#F2F5F7",
    padding: 25,
    justifyContent: "center"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 30
  },

  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    elevation: 3
  },

  label: {
    color: "#777",
    marginTop: 10,
    fontSize: 14
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

input: {

  backgroundColor: "#FFF",

  borderWidth: 1,

  borderColor: "#DDD",

  borderRadius: 10,

  padding: 12,

  marginBottom: 10

},

  button: {
    backgroundColor: "#1565C0",
    marginTop: 30,
    padding: 16,
    borderRadius: 10
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },

  logout: {
    marginTop: 20
  },

  logoutText: {
    color: "#D32F2F",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },

 deleteButton: {

  backgroundColor: "#D32F2F",

  padding: 15,

  borderRadius: 10,

  marginTop: 15

},

deleteText: {

  color: "#FFF",

  textAlign: "center",

  fontWeight: "bold",

  fontSize: 18

},

});

