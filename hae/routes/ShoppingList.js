import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Text,
  Flex,
  Input,
  Button,
  Checkbox,
} from "native-base";

const ShoppingList = () => {
  const [quantity, setQuantity] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [removedIngredientsList, setRemovedIngredientsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIngredientsList = await AsyncStorage.getItem(
          "ingredientsList"
        );
        const parsedIngredientsList = JSON.parse(storedIngredientsList) || [];
        setIngredientsList(parsedIngredientsList);

        const storedRemovedIngredientsList = await AsyncStorage.getItem(
          "removedIngredientsList"
        );
        const parsedRemovedIngredientsList =
          JSON.parse(storedRemovedIngredientsList) || [];
        setRemovedIngredientsList(parsedRemovedIngredientsList);
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const saveIngredient = async () => {
    try {
      const newIngredient = { quantity, ingredient };
      const updatedIngredientsList = [...ingredientsList, newIngredient];
      setIngredientsList(updatedIngredientsList);
      setQuantity("");
      setIngredient("");

      await AsyncStorage.setItem(
        "ingredientsList",
        JSON.stringify(updatedIngredientsList)
      );
      console.log("Data saved successfully!");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const checkIngredient = async (index) => {
    try {
      const storedIngredients = await AsyncStorage.getItem("ingredientsList");
      if (storedIngredients) {
        const parsedIngredients = JSON.parse(storedIngredients);
        const removedIngredients =
          JSON.parse(await AsyncStorage.getItem("removedIngredientsList")) ||
          [];

        const removedIngredient = parsedIngredients.splice(index, 1)[0];
        const updatedRemovedIngredients = [
          ...removedIngredients,
          removedIngredient,
        ];

        await AsyncStorage.setItem(
          "removedIngredientsList",
          JSON.stringify(updatedRemovedIngredients)
        );
        await AsyncStorage.setItem(
          "ingredientsList",
          JSON.stringify(parsedIngredients)
        );

        console.log("removedIngredients:", updatedRemovedIngredients);
        setRemovedIngredientsList(updatedRemovedIngredients);
        setIngredientsList(parsedIngredients);
      }
    } catch (error) {
      console.log("Error removing ingredient:", error);
    }
  };

  const uncheckIngredient = async (index) => {
    try {
      const storedRemovedIngredients = await AsyncStorage.getItem(
        "removedIngredientsList"
      );
      if (storedRemovedIngredients) {
        const parsedRemovedIngredients = JSON.parse(storedRemovedIngredients);
        const ingredients =
          JSON.parse(await AsyncStorage.getItem("ingredientsList")) || [];

        const uncheckedIngredient = parsedRemovedIngredients.splice(
          index,
          1
        )[0];
        const updatedIngredientsList = [...ingredients, uncheckedIngredient];

        await AsyncStorage.setItem(
          "ingredientsList",
          JSON.stringify(updatedIngredientsList)
        );
        await AsyncStorage.setItem(
          "removedIngredientsList",
          JSON.stringify(parsedRemovedIngredients)
        );

        console.log("ingredientsList:", updatedIngredientsList);
        setIngredientsList(updatedIngredientsList);
        setRemovedIngredientsList(parsedRemovedIngredients);
      }
    } catch (error) {
      console.log("Error unchecking ingredient:", error);
    }
  };

  const clearRemovedIngredients = async () => {
    try {
      await AsyncStorage.removeItem("removedIngredientsList");
      setRemovedIngredientsList([]);
      console.log("Removed ingredients cleared.");
    } catch (error) {
      console.log("Error clearing removed ingredients:", error);
    }
  };

  return (
    <NativeBaseProvider>
      <Flex direction="column">
        {ingredientsList.map((ingredient, index) => {
          if (removedIngredientsList.includes(ingredient)) {
            return null;
          }

          return (
            <Flex
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>
                {ingredient?.quantity} {ingredient?.ingredient}
              </Text>
              <Checkbox
                isChecked={false}
                onChange={() => checkIngredient(index)}
                accessibilityLabel="done"
              />
            </Flex>
          );
        })}
      </Flex>

      <Flex direction="row" alignItems="center">
        <Input
          placeholder="Menge"
          width="20"
          onChangeText={(text) => setQuantity(text)}
          value={quantity}
          keyboardType="numeric"
        />
        <Input
          placeholder="Zutat"
          width="20"
          onChangeText={(text) => setIngredient(text)}
          value={ingredient}
        />
        <Button size="sm" ml="auto" onPress={saveIngredient}>
          Hinzufügen
        </Button>
      </Flex>

      <Flex direction="column">
        {removedIngredientsList.map((ingredient, index) => {
          if (!ingredient) {
            return null; // Skip rendering null values
          }
          return (
            <Flex
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text strikeThrough>
                {ingredient?.quantity} {ingredient?.ingredient}
              </Text>
              <Checkbox
                isChecked={true}
                onChange={() => uncheckIngredient(index)}
                accessibilityLabel="undo"
              />
            </Flex>
          );
        })}
        <Flex alignItems="flex-end">
          {removedIngredientsList.length > 0 && (
            <Button
              size="sm"
              colorScheme="secondary"
              onPress={clearRemovedIngredients}
              ios_ripple={{ color: "#000000" }}
            >
              Abgehakte löschen
            </Button>
          )}
        </Flex>
      </Flex>
    </NativeBaseProvider>
  );
};

export default ShoppingList;
