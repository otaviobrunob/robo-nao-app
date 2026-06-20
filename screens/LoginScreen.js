import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function LoginScreen({ navigation }) {
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
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Entrar
        </Text>
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