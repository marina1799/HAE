import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Input, Button } from "native-base";

const CreateRecipeList = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setDescription] = useState("");
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedInputList = await AsyncStorage.getItem("inputList");
        if (storedInputList) {
          setInputList(JSON.parse(storedInputList));
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addBook = async () => {
    try {
      const newBook = { bookName, bookDescription };
      const updatedInputList = [...inputList, newBook];

      await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
      console.log("Data saved successfully!");

      setInputList(updatedInputList);
      console.log("Updated inputList:", updatedInputList);

      navigation.navigate("RecipeBooks");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  return (
    <NativeBaseProvider>
      <Input
        placeholder="Name"
        width="100%"
        mt="28"
        onChangeText={(text) => setBookName(text)}
        value={bookName}
      />
      <Input
        placeholder="Beschreibung"
        width="100%"
        mt="28"
        onChangeText={(text) => setDescription(text)}
        value={bookDescription}
      />
      <Button size="lg" onPress={addBook}>
        <Text>Hinzufügen</Text>
      </Button>
    </NativeBaseProvider>
  );
};

export default CreateRecipeList;
