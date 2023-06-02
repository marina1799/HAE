import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipes from "./routes/Recipes";
import ShoppingList from "./routes/ShoppingList";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{ title: "Rezepte" }}
        />
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{ title: "Einkaufszettel" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
