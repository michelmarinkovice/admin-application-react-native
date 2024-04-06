import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageProcessesStack from "./ManageProcessesStack";
import Requirements from "../screens/Requirements";

const Tab = createBottomTabNavigator();

const RequirementListTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Requerimientos"
        component={Requirements}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray-full" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gestionar Procesos"
        component={ManageProcessesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RequirementListTab;
