import React, { useState } from "react";
import { NativeBaseProvider, Button, Flex, Text, Fab, FlatList } from "native-base";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const RecipesList = ({ navigation, route }) => {
  const selectedItem = route.params.selectedItem; // Das ausgewählte Objekt aus route.params abrufen
  const [inputList, setInputList] = useState([]);

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

  const deleteBook = async (index) => {
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
    await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
    console.log("Data saved successfully!");
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Flex direction="row-reverse">
        <Button
          size="lg"
          variant="unstyled"
          onPress={() => navigation.navigate("ShoppingList")}
        >
          <Text color="primary.400" underline>
            Einkaufszettel
          </Text>
        </Button>
      </Flex>
      <Flex direction="row" p="3">
        <Text>Rezepteliste:</Text>
      </Flex>
      <Flex direction="row-reverse">
      </Flex>

      <Text>{selectedItem.bookName}</Text>
      <Text>{selectedItem.bookDescription}</Text>

      <FlatList
        data={inputList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginTop: 2,
              backgroundColor: "white",
              padding: 12,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={item.key}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
                marginRight: 8,
              }}
            >
              {item.recipeName}
              {"\n"}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "gray",
                  marginRight: 8,
                }}
              >
                {item.recipeDescription}
              </Text>
            </Text>

            <Button onPress={() => deleteBook(index)}>
              <Text>-</Text>
            </Button>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Fab
        onPress={() => navigation.navigate("CreateRecipe")}
        renderInPortal={false}
      />
    </NativeBaseProvider>
  );
};

export default RecipesList;
