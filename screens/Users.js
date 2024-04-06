import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const url = process.env.EXPO_PUBLIC_USERS;
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
          setUsersData(data);
        } else {
          console.error("Error en la solicitud HTTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUsersData();
  }, []);

  return (
    <View style={{ display: "flex", backgroundColor: "white" }}>
      <FlatList
        data={usersData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>
              {item.first_name + " " + item.last_name}
            </Text>
            <Text style={styles.cell}>{item.email}</Text>
            <Text style={styles.cell}>
              {item.is_active ? (
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={20}
                  color="green"
                />
              ) : (
                <Ionicons
                  name="ios-close-circle-outline"
                  size={20}
                  color="red"
                />
              )}
            </Text>
            <Text style={styles.cell}>
              {item.admin ? (
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={20}
                  color="green"
                />
              ) : (
                <Ionicons
                  name="ios-close-circle-outline"
                  size={20}
                  color="red"
                />
              )}
            </Text>
            <Text style={styles.cell}>
              {item.is_superuser ? (
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={20}
                  color="green"
                />
              ) : (
                <Ionicons
                  name="ios-close-circle-outline"
                  size={20}
                  color="red"
                />
              )}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Email</Text>
            <Text style={styles.headerText}>Activo</Text>
            <Text style={styles.headerText}>Admin</Text>
            <Text style={styles.headerText}>Super Usuario</Text>
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

export default Users;
