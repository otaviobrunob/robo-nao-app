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

import { login } from "../services/authService";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function fazerLogin() {

    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {

      setLoading(true);

      await login(email, senha);

      navigation.replace("Perfil");

    } catch (error) {

      let mensagem = "Erro ao realizar login.";

      switch (error.code) {

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          mensagem = "E-mail ou senha inválidos.";
          break;

        case "auth/invalid-email":
          mensagem = "E-mail inválido.";
          break;

        default:
          mensagem = error.message;

      }

      Alert.alert("Erro", mensagem);

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🤖 Robô NAO
      </Text>

      <Text style={styles.subtitle}>
        Controle do Terapeuta
      </Text>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
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
        onPress={fazerLogin}
      >

        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        )}

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.link}>
          Criar uma conta
        </Text>
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
    fontSize: 34,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
    fontSize: 18
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
    borderRadius: 10,
    marginTop: 10
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },

  link: {
    marginTop: 20,
    color: "#1565C0",
    textAlign: "center",
    fontWeight: "bold"
  }

});