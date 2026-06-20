import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import {
  adicionarComando,
  listarComandos,
  excluirComando,
  atualizarComando,
} from "../services/comandosService";

export default function ComandosScreen() {

  const [fala, setFala] = useState("");
  const [emocao, setEmocao] = useState("");
  const [gesto, setGesto] = useState("");

  const [comandos, setComandos] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarComandos();
  }, []);

  async function carregarComandos() {

    const lista = await listarComandos();

    setComandos(lista);

  }

  async function salvar() {

    if (!fala || !emocao || !gesto) {

      Alert.alert("Atenção", "Preencha todos os campos.");

      return;

    }

    if (editando) {

      await atualizarComando(editando, {

        fala,
        emocao,
        gesto

      });

    } else {

      await adicionarComando({

        fala,
        emocao,
        gesto

      });

    }

    limpar();

    carregarComandos();

  }

  function limpar() {

    setFala("");
    setEmocao("");
    setGesto("");

    setEditando(null);

  }

  function editar(item) {

    setFala(item.fala);

    setEmocao(item.emocao);

    setGesto(item.gesto);

    setEditando(item.id);

  }

  async function remover(id) {

    await excluirComando(id);

    carregarComandos();

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        🤖 Comandos do Robô
      </Text>

      <TextInput
        placeholder="Fala"
        style={styles.input}
        value={fala}
        onChangeText={setFala}
      />

      <TextInput
        placeholder="Emoção"
        style={styles.input}
        value={emocao}
        onChangeText={setEmocao}
      />

      <TextInput
        placeholder="Gesto"
        style={styles.input}
        value={gesto}
        onChangeText={setGesto}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
      >
        <Text style={styles.buttonText}>
          {editando ? "Atualizar" : "Salvar"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={comandos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.nome}>
              🗣 {item.fala}
            </Text>

            <Text>😊 {item.emocao}</Text>

            <Text>🙋 {item.gesto}</Text>

            <View style={styles.row}>

              <TouchableOpacity
                onPress={() => editar(item)}
              >
                <Text style={styles.editar}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => remover(item.id)}
              >
                <Text style={styles.excluir}>
                  Excluir
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        )}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 20,

    backgroundColor: "#F2F5F7"

  },

  title: {

    fontSize: 28,

    fontWeight: "bold",

    color: "#1565C0",

    textAlign: "center",

    marginBottom: 20

  },

  input: {

    backgroundColor: "#FFF",

    borderRadius: 10,

    padding: 15,

    marginBottom: 10,

    borderWidth: 1,

    borderColor: "#DDD"

  },

  button: {

    backgroundColor: "#1565C0",

    padding: 15,

    borderRadius: 10,

    marginBottom: 20

  },

  buttonText: {

    color: "#FFF",

    textAlign: "center",

    fontWeight: "bold",

    fontSize: 18

  },

  card: {

    backgroundColor: "#FFF",

    padding: 15,

    marginBottom: 12,

    borderRadius: 10,

    elevation: 2

  },

  nome: {

    fontWeight: "bold",

    fontSize: 18,

    marginBottom: 5

  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 10

  },

  editar: {

    color: "#1565C0",

    fontWeight: "bold"

  },

  excluir: {

    color: "#D32F2F",

    fontWeight: "bold"

  }

});