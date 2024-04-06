import { StyleSheet, Text, View, FlatList, Button } from "react-native";

/* Work in progress
const RetryDiscardProcesses = async (processId) => {
  try {
    const url =
      process.env.EXPO_PUBLIC_PROCESS_RETRY + `{processId}/retry/`;
    let token = await SecureStore.getItemAsync("a");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
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
*/

const DetailProcesses = ({ route }) => {
  const data = route.params["selectedItem"];
  console.log(data);
  return (
    <View style={{ display: "flex", backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 3,
            paddingHorizontal: 20,
            backgroundColor: "blue",
            margin: 10,
            borderRadius: 9,
          }}
        >
          <Button
            title="Reintentar"
            color="white"
            onPress={() => {
              console.log("Click");
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 3,
            paddingHorizontal: 20,
            backgroundColor: "red",
            margin: 10,
            borderRadius: 9,
          }}
        >
          <Button
            title="Cancelar"
            color="white"
            onPress={() => {
              console.log("Click");
            }}
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.process_type}</Text>
            <Text style={styles.cell}>{item.created_at}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>ID Proceso</Text>
            <Text style={styles.headerText}>Tipo de Proceso</Text>
            <Text style={styles.headerText}>Fecha de Creación</Text>
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

export default DetailProcesses;
