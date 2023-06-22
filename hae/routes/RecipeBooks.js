import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  NativeBaseProvider,
  Button,
  Fab,
  Text,
  Flex,
  Modal,
  FlatList,
  Image,
  View,
  Input,
} from "native-base";
import { FabStyles, buttonStyles } from "../theme/Components";

const RecipeBooks = ({ navigation }) => {
  const [inputList, setInputList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setShowModal(false);
    }
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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

  const handlePress = (item) => {
    navigation.navigate("RecipesList", { selectedItem: item });
  };

  const deleteBook = async (index) => {
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
    await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
    console.log("Data saved successfully!");

    setDeleteModal(false);
  };

  const DisplayImage = ({ selectedImage }) => {
    return (
      <View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    );
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

      <Fab
        style={FabStyles.primaryFab}
        onPress={() => setShowModal(true)}
        renderInPortal={false}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Add</Modal.Header>
          <Modal.Body>
            <Button.Group space={2}>
              <Button
                size="lg"
                onPress={() => navigation.navigate("CreateRecipeList")}
              >
                Recipe Book
              </Button>
              <Button
                size="lg"
                onPress={() => navigation.navigate("CreateRecipe")}
              >
                Recipe
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <FlatList
        data={inputList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.selectedImage && (
                <Image
                  source={{ uri: item.selectedImage }}
                  style={{ width: 50, height: 50, marginRight: 8 }}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {item.bookName}
                {"\n"}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  {item.bookDescription}
                </Text>
              </Text>
            </View>
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
                <Modal.Header>Delete recipe book?</Modal.Header>
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
                      onPress={() => deleteBook(index)}
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
    </NativeBaseProvider>
  );
};

export default RecipeBooks;
