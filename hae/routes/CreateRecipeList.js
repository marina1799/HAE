import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  Text,
  Input,
  Button,
  Flex,
  Box,
} from "native-base";

const CreateRecipeList = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setDescription] = useState("");
  const [inputList, setInputList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  // Update the addBook function to include the selectedImage in the newBook object
  const addBook = async () => {
    //if (bookName === "" || bookDescription === "") {
    //setErrorMessage("Bitte füllen Sie alle Felder aus.");
    //setTimeout(() => {
    // setErrorMessage("");
    // }, 3000);
    // } else {
    try {
      const newBook = {
        bookName,
        bookDescription,
      };
      const updatedInputList = [...inputList, newBook];

      await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
      console.log("Data saved!");

      setInputList(updatedInputList);

      navigation.navigate("RecipeBooks");
    } catch (error) {
      console.log("Error saving data:", error);
    }
    setErrorMessage("");
    //}
  };

  return (
    <NativeBaseProvider>
      <Box m={4}>
        <Flex flexDirection={"column"}>
          <Input
            placeholder="Name"
            onChangeText={(text) => setBookName(text)}
            value={bookName}
          />
          <Input
            mt={2}
            placeholder="Beschreibung"
            onChangeText={(text) => setDescription(text)}
            value={bookDescription}
          />
          <Flex alignItems={"center"}>
            <Button
              onPress={addBook}
              variant={"outline"}
              colorScheme={"success"}
              mt={4}
            >
              Hinzufügen
            </Button>
          </Flex>
          {errorMessage !== "" && <Text>{errorMessage}</Text>}
        </Flex>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateRecipeList;
