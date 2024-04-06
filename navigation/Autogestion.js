import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AutogestionNNCC from "../screens/AutogestionNNCC";
import AutogestionProd from "../screens/AutogestionProd";
import AutogestionStores from "../screens/AutogestionStores";

const Tab = createBottomTabNavigator();

const Autogestion = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="NNCC"
        component={AutogestionNNCC}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-full" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Productos"
        component={AutogestionProd}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Locales"
        component={AutogestionStores}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Autogestion;
