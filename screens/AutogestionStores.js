import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

function AutogestionStores() {
  const [storesData, setStoresData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const url = process.env.EXPO_PUBLIC_STORES_SUMMARY;
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
          setStoresData(data);
        } else {
          console.error("Error en la solicitud HTTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchStoresData();
  }, []);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ display: "flex", backgroundColor: "white" }}>
      <FlatList
        data={storesData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.client_name}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>{item.created_date}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Cliente</Text>
            <Text style={styles.headerText}>Estatus</Text>
            <Text style={styles.headerText}>Fecha Creación</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 5,
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 8,
  },
  headerText: {
    flex: 1,
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
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

export default AutogestionStores;
