import * as SecureStore from "expo-secure-store";
import { Text, View, TouchableOpacity } from "react-native";

const ClientDetail = ({ route }) => {
  const data = route.params["selectedItem"];
  const clientId = route.params["clientId"];

  const makePromotion = async () => {
    try {
      const url = process.env.EXPO_PUBLIC_CLIENTS + `${clientId}/promote/`;
      const token = await SecureStore.getItemAsync("a"); // for testing purposes
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
      });
      if (response.ok) {
        console.error("Se encoló la promoción!");
      } else {
        const errorMessage = await response.text();
        //console.error('Error en la solicitud HTTP')
        console.error(`Detalles del error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  const makeBackup = async () => {
    try {
      const url = process.env.EXPO_PUBLIC_CLIENTS + `${clientId}/backup/`;
      const token = await SecureStore.getItemAsync("a");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
      });
      if (response.ok) {
        console.error("Se encoló el backup!");
      } else {
        console.error("Error en la solicitud HTTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          height: "15%",
          width: "100%",
          borderTopWidth: 0.45,
          borderBottomWidth: 0.45,
        }}
      >
        <Text style={{ color: "#164ca1", fontWeight: 500, fontSize: 18 }}>
          {data}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          makeBackup();
        }}
        style={{
          backgroundColor: "#1248a1",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          height: "15%",
          marginLeft: "5%",
          marginRight: "5%",
          width: "auto",
          borderRadius: 3,
        }}
      >
        <Text style={{ color: "white" }}>Hacer Backup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          makePromotion();
        }}
        style={{
          backgroundColor: "#164ca1",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          height: "15%",
          marginLeft: "5%",
          marginRight: "5%",
          width: "auto",
          borderRadius: 3,
        }}
      >
        <Text style={{ color: "white" }}>Promocionar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientDetail;
