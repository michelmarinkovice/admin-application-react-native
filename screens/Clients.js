import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Clients = ({ navigation }) => {
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const url = process.env.EXPO_PUBLIC_CLIENTS;
        const token = await SecureStore.getItemAsync("a"); // for testing purposes
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await fetch(url, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setClientData(data);
        } else {
          console.error("Error en la solicitud HTTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchClientData();
  }, []);
  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  ) : (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          width: "90%",
          height: "7%",
          marginTop: 80,
          borderRadius: 12,
        }}
      >
        <Ionicons
          name="md-search-sharp"
          size={24}
          color="black"
          style={{ margin: 11 }}
        />
        <TextInput
          onChangeText={setSearchText}
          value={searchText}
          autoCapitalize="none"
          placeholder="Busca un cliente"
          autoCorrect={false}
        />
      </View>
      {searchText === "" ? (
        <View>
          <FlatList
            data={clientData}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 30,
                    margin: 5,
                    borderRadius: 6,
                    backgroundColor: "white",
                  }}
                >
                  <Text>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detalle de Cliente", {
                        selectedItem: item.name,
                        prodSchema: item.schema_name,
                        backupSchema: item.backup_schema_name,
                        prefix: item.prefix,
                        clientId: item.id,
                      });
                    }}
                  >
                    <Ionicons name="list-sharp" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={clientData.filter((listItem) =>
              listItem.name.toLowerCase().includes(searchText.toLowerCase()),
            )}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 30,
                    margin: 5,
                    width: "90%",
                    borderRadius: 6,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={styles.item}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detalle de Cliente", {
                        selectedItem: item.name,
                        backupSchema: item.backup_schema_name,
                        clientId: item.id,
                      });
                    }}
                  >
                    <Ionicons name="list-sharp" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Clients;
