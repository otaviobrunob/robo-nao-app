import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";
import { logout, usuarioAtual } from "../services/authService";

export default function PerfilScreen({ navigation }) {

  const [usuario, setUsuario] = useState(null);
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
        setUsuario(documento.data());
      }

    } catch (error) {

      Alert.alert("Erro", error.message);

    } finally {

      setLoading(false);

    }

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
        <Text style={styles.value}>{usuario?.nome}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{usuario?.email}</Text>

        <Text style={styles.label}>Tipo</Text>
        <Text style={styles.value}>{usuario?.tipo}</Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Comandos")}
      >

        <Text style={styles.buttonText}>
          🤖 Controlar Robô
        </Text>

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
  }

});