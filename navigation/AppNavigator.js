import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import ComandosScreen from "../screens/ComandosScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1565C0",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Robô NAO" }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
        />

        <Stack.Screen
          name="Comandos"
          component={ComandosScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}