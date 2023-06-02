import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Flex, Input, Button } from "native-base";

const ShoppingList = () => {
  const [quantity, setQuantity] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);

        if (values) {
          values.forEach((value) => {
            const [key, data] = value;
            console.log(`${key}: ${data}`);
          });

          const storedQuantity =
            values.find((value) => value[0] === "quantity")?.[1] || "";
          const storedIngredient =
            values.find((value) => value[0] === "ingredient")?.[1] || "";

          setQuantity(storedQuantity);
          setIngredient(storedIngredient);
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const saveData = async () => {
    try {
      const newInput = { quantity, ingredient };
      const updatedInputList = [...inputList, newInput];
      setInputList(updatedInputList);

      await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
      console.log("Data saved successfully!");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const handleLogStoredData = async () => {
    try {
      const storedInputList = await AsyncStorage.getItem("inputList");
      const parsedInputList = JSON.parse(storedInputList);
      setInputList(parsedInputList);
      console.log("Stored data:", parsedInputList);
    } catch (error) {
      console.log("Error logging stored data:", error);
    }
  };

  return (
    <NativeBaseProvider>
      <Flex direction="row" p="3">
        <Text>Produkte:</Text>
      </Flex>

      <Flex direction="column" p={3}>
        {inputList.map((input, index) => (
          <Text key={index}>
            {input.quantity} {input.ingredient}
          </Text>
        ))}
      </Flex>

      <Flex direction="row" px="3" alignItems="center">
        <Input
          placeholder="Menge"
          width="20"
          onChangeText={(text) => setQuantity(text)}
          value={quantity}
        />
        <Input
          placeholder="Zutat"
          width="20"
          mx="1"
          onChangeText={(text) => setIngredient(text)}
          value={ingredient}
        />
        <Button size="sm" ml="auto" onPress={saveData}>
          Hinzufügen
        </Button>
      </Flex>

      <Flex direction="row" p={3}>
        <Button size="xs" variant="outline" onPress={handleLogStoredData}>
          Log Stored Data
        </Button>
      </Flex>
    </NativeBaseProvider>
  );
};

export default ShoppingList;
