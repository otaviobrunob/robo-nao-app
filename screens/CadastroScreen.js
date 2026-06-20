import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { cadastrar } from "../services/authService";
import { salvarUsuario } from "../services/firestoreService";

export default function CadastroScreen({ navigation }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function criarConta() {

    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Senha", "A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    try {

      setLoading(true);

      const credencial = await cadastrar(email, senha);

 await salvarUsuario({
  uid: credencial.user.uid,
  nome,
  email,
});

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {

      Alert.alert(
        "Erro",
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Criar Conta
      </Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={criarConta}
      >

        {loading ? (

          <ActivityIndicator color="#FFF" />

        ) : (

          <Text style={styles.buttonText}>
            Cadastrar
          </Text>

        )}

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F2F5F7"
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 40
  },

  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD"
  },

  button: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 10
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  }

});