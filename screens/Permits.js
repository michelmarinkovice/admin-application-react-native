import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const Permits = () => {
  const [permitsData, setPermitsData] = useState([]);

  useEffect(() => {
    const fetchPermitsData = async () => {
      try {
        const url = process.env.EXPO_PUBLIC_USERS_DB;
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
          setPermitsData(data);
        } else {
          console.error("Error en la solicitud HTTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPermitsData();
  }, []);

  return (
    <View style={{ display: "flex", backgroundColor: "white" }}>
      <FlatList
        data={permitsData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.username}</Text>
            <Text style={styles.cell}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ flexDirection: "row" }}>
                  Comunes: {item.isv_bd_inicial_db_comunes}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Scores: {item.isv_logs_db}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Passmanager: {item.passmanager}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Maestro: {item.isv_clientes_db}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Scrappers: {item.b2b_scrapers}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Commons PG: {item.commons}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Master PG: {item.master}
                </Text>
                <Text style={{ flexDirection: "row" }}>
                  Redshift: {item.instoreview}
                </Text>
              </View>
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Usuario</Text>
            <Text style={styles.headerText}>Permisos BBDD</Text>
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
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  cell: {
    fontSize: 8,
    justifyContent: "center",
    alignItems: "center",
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

export default Permits;
