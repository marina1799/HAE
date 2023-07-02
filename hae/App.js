import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import RecipeBooks from "./routes/RecipeBooks";
import ShoppingList from "./routes/ShoppingList";
import RecipesList from "./routes/RecipesList";
import CreateRecipeList from "./routes/CreateRecipeList";
import CreateRecipe from "./routes/CreateRecipe";
import Recipe from "./routes/Recipe";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
          name="TabNavigator"
          component={TabNavigator}
          options={{
            title: "Startseite",
          }}
        />
        <Stack.Screen
          name="RecipeBooks"
          component={RecipeBooks}
          options={{ title: "Rezeptelisten" }}
        />

        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
          options={{ title: "Rezepte" }}
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
          options={{ title: "Rezepteliste erstellen" }}
        />
        <Stack.Screen
          name="Recipe"
          component={Recipe}
          options={{ title: "Rezept" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "RecipeBooks") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "ShoppingList") {
            iconName = focused ? "checkbox" : "checkbox-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0891b2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="RecipeBooks"
        component={RecipeBooks}
        options={{ title: "Rezeptelisten", headerShown: false }}
      />
      <Tab.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={{
          title: "Einkaufszettel",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
