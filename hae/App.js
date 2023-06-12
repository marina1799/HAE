import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipes from "./routes/RecipeBooks";
import ShoppingList from "./routes/ShoppingList";
import RecipesList from "./routes/RecipesList";
import CreateRecipeList from "./routes/CreateRecipeList";
import CreateRecipe from "./routes/CreateRecipe";

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
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
          options={{ title: "RecipesList" }}
        />
        <Stack.Screen
          name="CreateRecipeList"
          component={CreateRecipeList}
          options={{ title: "CreateRecipeList" }}
        />
        <Stack.Screen
          name="CreateRecipe"
          component={CreateRecipe}
          options={{ title: "CreateRecipe" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
