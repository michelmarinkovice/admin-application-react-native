import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";

const ManageProcesses = ({ navigation }) => {
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const url = process.env.EXPO_PUBLIC_PENDING_ERRORS;
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
          setErrorData(data);
        } else {
          console.error("Error en la solicitud HTTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchErrorData();
  }, []);

  return (
    <View style={{ display: "flex", backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={errorData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.client.name}</Text>
            <Text style={styles.cell}>{item.created_at}</Text>
            <Text style={styles.cell}>{item.process_type}</Text>
            <View style={{ flex: 1 }}>
              <Button
                title="Ver Detalle"
                color="#2c6fdb"
                titleStyle={{ color: "white", fontSize: 2 }}
                onPress={() => {
                  navigation.navigate("Detalle Proceso", {
                    selectedItem: item.pending_processes,
                  });
                }}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Cliente</Text>
            <Text style={styles.headerText}>Fecha Creación</Text>
            <Text style={styles.headerText}>Tipo de Proceso</Text>
          </View>
        )}
      />
    </View>
  );
};

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
});

export default ManageProcesses;
