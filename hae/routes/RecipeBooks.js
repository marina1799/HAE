import React, { useState, useEffect } from "react";
import { TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Button, Text, Flex, Box, FlatList, Icon } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const Recipes = ({ navigation }) => {
  const [inputList, setInputList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const deleteBook = async (index) => {
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
    await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
    console.log("Data saved successfully!");
  };

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

      <Button size="lg" onPress={() => navigation.navigate("CreateRecipeList", { setInputList })}>
        +
      </Button>

      <FlatList
        data={inputList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("RecipesList")}
            style={{
              marginTop: 2,
              backgroundColor: 'green',
              padding: 12,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={item.key}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginRight: 8 }}>
              {item.bookName}
            </Text>
            <TouchableOpacity onPress={() => deleteBook(index)}>
              <Icon
                as={Ionicons}
                name="trash-outline"
                size={6}
                color="white"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

    </NativeBaseProvider>
  );
};

export default Recipes;
