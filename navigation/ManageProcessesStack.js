import { createStackNavigator } from "@react-navigation/stack";

import DetailProcesses from "../screens/DetailProcesses";
import ManageProcesses from "../screens/ManageProcesses";

const Stack = createStackNavigator();

const ManageProcessesStack = () => {
  return (
    <Stack.Navigator initialRouteName="ManageProcesses">
      <Stack.Screen
        name="RequirementList"
        component={ManageProcesses}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detalle Proceso"
        component={DetailProcesses}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ManageProcessesStack;
