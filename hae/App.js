import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecipeBooks from "./routes/RecipeBooks";

import ShoppingList from "./routes/ShoppingList";
import RecipesList from "./routes/RecipesList";
import CreateRecipeList from "./routes/CreateRecipeList";
import CreateRecipe from "./routes/CreateRecipe";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipeBooks"
          component={{ RecipeBooks }}
          options={{ title: "RecipeBooks" }}
        />
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
          options={{ title: "RecipesList" }}
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
        <Stack.Screen
          name="CreateRecipeList"
          component={CreateRecipeList}
          options={{ title: "CreateRecipeList" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
