import * as SecureStore from "expo-secure-store";

const SecureStoreValue = async (key) => {
  const result = await SecureStore.getItemAsync(key);
  console.log("Primer console.log", result);
  if (result) {
    console.log("Segundo console.log", "todo ok");
  } else {
    console.log("no existe");
  }
};
export default SecureStoreValue;
