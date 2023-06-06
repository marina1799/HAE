import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipesList from "./routes/RecipesList";
import CreateRecipe from "./routes/CreateRecipe";
import ShoppingList from "./routes/ShoppingList";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
          options={{ title: "RezepteListe" }}
        />
        <Stack.Screen
          name="CreateRecipe"
          component={CreateRecipe}
          options={{ title: "Rezept erstellen" }}
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
