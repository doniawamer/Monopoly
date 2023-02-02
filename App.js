import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./Screens/Home/Home";
import { NewGame } from "./Screens/NewGame/NewGame";
import { theme } from "./utils/styles";

const Stack = createNativeStackNavigator();

const muitheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.teal,
    secondary: theme.colors.blue,
    tertiary: theme.colors.sky,
    background: theme.colors.white,
    accent: theme.colors.teal,
    error: theme.colors.peach,
    text: theme.colors.black,
    disabled: theme.colors.lightestTeal,
    onSurface: theme.colors.lightTeal,
    surfaceDisabled: theme.colors.lightestTeal,
    error50: theme.colors.lightestTeal,
  },
  disabledButton: {
    backgroundColor: theme.colors.lightestTeal,
  },
};

export default function App() {
  return (
    <PaperProvider theme={muitheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="New Game"
            component={NewGame}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
