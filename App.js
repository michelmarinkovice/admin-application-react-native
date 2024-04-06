import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View, Image, Button, TextInput } from "react-native";

import Autogestion from "./navigation/Autogestion";
import ClientDetailStack from "./navigation/ClientDetailStack";
import RequirementListTab from "./navigation/RequirementListTab";
import Permits from "./screens/Permits";
import Users from "./screens/Users";

const clientsIcon = ({ color, size }) => (
  <Ionicons name="md-person" color={color} size={size} />
);
const autogestionIcon = ({ color, size }) => (
  <Ionicons name="color-wand" color={color} size={size} />
);
/*
const pilotBoardIcon = ({ color, size }) => (
  <Ionicons name="clipboard" color={color} size={size} />
);
*/
const permitsIcon = ({ color, size }) => (
  <Ionicons name="ios-build-sharp" color={color} size={size} />
);
const requirementListIcon = ({ color, size }) => (
  <Ionicons name="ios-git-merge-sharp" color={color} size={size} />
);
const usersIcon = ({ color, size }) => (
  <Ionicons name="person-circle-sharp" color={color} size={size} />
);

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "70%",
        },
      }}
    >
      <Drawer.Screen
        name="Clientes"
        component={ClientDetailStack}
        options={{ drawerIcon: clientsIcon }}
      />
      <Drawer.Screen
        name="Autogestión"
        component={Autogestion}
        options={{ drawerIcon: autogestionIcon }}
      />
      <Drawer.Screen
        name="Lista de Requerimientos"
        component={RequirementListTab}
        options={{ drawerIcon: requirementListIcon }}
      />
      <Drawer.Screen
        name="Usuarios"
        component={Users}
        options={{ drawerIcon: usersIcon }}
      />
      <Drawer.Screen
        name="Permisos"
        component={Permits}
        options={{ drawerIcon: permitsIcon }}
      />
    </Drawer.Navigator>
  );
}
// npx expo install expo-secure-store
export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passText, setPassText] = useState("");

  const Authentication = async (email, password) => {
    try {
      const url = process.env.EXPO_PUBLIC_TOKEN;
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        email,
        password,
      });
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });
      if (response.ok) {
        const data = await response.json();
        const access = data.access;
        // se deja la key como a
        await SecureStore.setItemAsync("a", access);
        setIsSignedIn(true);
      } else {
        console.error("Las credenciales son incorrectas.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //console.log(accessToken)
  return isSignedIn ? (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./assets/isv_logo_png.webp")}
        style={{ width: 300, height: 100 }}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmailText}
        value={emailText}
        autoCapitalize="none"
        placeholder="Ingresa tu correo"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassText}
        value={passText}
        autoCapitalize="none"
        secureTextEntry
        placeholder="Ingresa tu password"
      />
      <View style={styles.button}>
        <Button
          title="Iniciar Sesión"
          color="white"
          titleStyle={{ color: "white", fontSize: 12 }}
          onPress={() => Authentication(emailText, passText)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 22,
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  input: {
    width: "70%",
    marginTop: 2,
    marginBottom: 5,
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  button: {
    width: "70%",
    height: "6%",
    fontSize: 12,
    marginTop: 5,
    borderRadius: 3,
    shadowOpacity: 0.2,
    backgroundColor: "#2c6fdb",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "#000",
    paddingBottom: 8,
  },
  headerText: {
    flex: 1,
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
});
