import { createStackNavigator } from "@react-navigation/stack";

import ClientDetail from "../screens/ClientDetail";
import Clients from "../screens/Clients";

const Stack = createStackNavigator();

const ClientDetailStack = () => {
  return (
    <Stack.Navigator initialRouteName="Clients">
      <Stack.Screen
        name="Clientes Plataformas"
        component={Clients}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detalle de Cliente"
        component={ClientDetail}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ClientDetailStack;
