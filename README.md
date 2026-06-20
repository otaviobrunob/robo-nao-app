# 🤖 Robô NAO App

Aplicativo desenvolvido em **React Native + Expo** para auxiliar terapeutas no controle de um robô NAO durante sessões terapêuticas.

O sistema permite autenticação de usuários, gerenciamento do perfil do terapeuta e cadastro de comandos que poderão ser enviados ao robô.

---

# 📱 Funcionalidades

## Autenticação

* Cadastro de usuários
* Login
* Logout
* Exclusão de conta

## Perfil do Terapeuta

* Visualizar perfil
* Atualizar dados do perfil
* Excluir conta

## Comandos do Robô

CRUD completo:

* Criar comandos
* Listar comandos
* Atualizar comandos
* Excluir comandos

---

# 🛠 Tecnologias Utilizadas

* React Native
* Expo
* Firebase Authentication
* Cloud Firestore
* React Navigation
* JavaScript

---

# 📂 Estrutura do Projeto

```
robo-nao-app/

├── navigation/
├── screens/
├── services/
├── firebaseConfig.js
├── App.js
├── package.json
└── README.md
```

---

# 🔥 Banco de Dados

O aplicativo utiliza o Firebase.

## Authentication

Responsável por:

* Cadastro
* Login
* Exclusão de contas

## Cloud Firestore

Coleção **usuarios**

Campos:

* nome
* email
* telefone
* instituicao
* tipo
* dataCadastro

Coleção **comandos**

Campos:

* fala
* emocao
* gesto

---

# ▶ Como executar

Clone o projeto:

```bash
git clone https://github.com/SEU-USUARIO/robo-nao-app.git
```

Entre na pasta:

```bash
cd robo-nao-app
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npx expo start
```

Leia o QR Code utilizando o aplicativo **Expo Go**.

---

# 📸 Telas do Aplicativo

## Login

<img width="739" height="1600" alt="Login" src="https://github.com/user-attachments/assets/d5216bcf-153d-4215-ac8b-41e8ada16321" />


## Cadastro

<img width="739" height="1600" alt="Cadastro" src="https://github.com/user-attachments/assets/352a6bd6-d8af-49dd-99e0-8e3ac2487b1f" />


## Perfil

<img width="739" height="1600" alt="Perfil" src="https://github.com/user-attachments/assets/183931cb-2e13-4fac-91cc-a3a1ca707403" />


## Comandos

<img width="739" height="1600" alt="Comandos" src="https://github.com/user-attachments/assets/616ac63f-201c-464e-a481-64681bcb3564" />


---

# 👨‍💻 Desenvolvedor

Otávio Bruno Barbosa de Oliveira

Disciplina: Engenharia de Aplicações Móveis

PUC Minas
