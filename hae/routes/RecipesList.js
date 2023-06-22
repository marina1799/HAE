import React, { useState } from "react";
import { NativeBaseProvider, Modal, Button, Flex, Text, Fab, FlatList } from "native-base";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { FabStyles, buttonStyles } from "../theme/Components";
const RecipesList = ({ navigation, route }) => {
  const item = route.params.selectedItem; // Das ausgewählte Objekt aus route.params abrufen
  const [inputRecipe, setInputRecipe] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchData = async () => {
    try {
      const storedInputList = await AsyncStorage.getItem("inputRecipe");
      const parsedInputList = JSON.parse(storedInputList);

      setInputRecipe(parsedInputList || []);
      console.log("Stored data:", parsedInputList);
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const deleteRecipe = async (index) => {
    const updatedRecipe = [...inputRecipe];
    updatedRecipe.splice(index, 1);
    setInputRecipe(updatedRecipe);
    await AsyncStorage.setItem("inputRecipe", JSON.stringify(updatedRecipe));
    console.log("Data saved successfully!");

    setDeleteModal(false);
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
        {item.selectedImage && (
          <Image
            source={{ uri: item.selectedImage }}
            style={{ width: '100%', height: 200, marginRight: 8 }}
            resizeMode="cover"
          />
        )}
      </Flex>

      <FlatList
        data={inputRecipe}
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
              {item.recipeTitle}
              {"\n"}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "gray",
                  marginRight: 8,
                }}
              >
                {item.recipeDuration}
              </Text>
            </Text>
            <Button onPress={() => setDeleteModal(true)} renderInPortal={false}>
              <Text>-</Text>
            </Button>

            <Modal
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}
              _backdrop={{
                _dark: {
                  bg: "coolGray.800",
                },
                bg: "warmGray.50",
              }}
            >
              <Modal.Content maxWidth="350" maxH="212">
                <Modal.CloseButton />
                <Modal.Header>Delete recipe?</Modal.Header>
                <Modal.Body>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => setDeleteModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={buttonStyles.primaryButton}
                      onPress={() => deleteRecipe(index)}
                    >
                      <Text>Delete</Text>
                    </Button>
                  </Button.Group>
                </Modal.Body>
              </Modal.Content>
            </Modal>


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
