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
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedInputList = await AsyncStorage.getItem("inputList");
        const parsedInputList = JSON.parse(storedInputList);
        setInputList(parsedInputList || []);
        console.log("Stored data:", parsedInputList);
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
    </NativeBaseProvider>
  );
};

export default ShoppingList;
