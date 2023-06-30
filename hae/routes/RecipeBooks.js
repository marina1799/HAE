import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  NativeBaseProvider,
  Button,
  Fab,
  Text,
  Modal,
  FlatList,
  View,
  DeleteIcon,
  AddIcon,
  Box,
} from "native-base";
import { FabStyles, buttonStyles } from "../theme/Components";

const RecipeBooks = ({ navigation }) => {
  const [inputList, setInputList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate("RecipesList", { selectedItem: item });
  };

  const deleteBook = async () => {
    if (deleteIndex !== null) {
      const updatedInputList = [...inputList];
      updatedInputList.splice(deleteIndex, 1);
      setInputList(updatedInputList);
      await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
      console.log("Data saved!");
      setDeleteModal(false);
    }
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteIndex(null);
  };

  return (
    <NativeBaseProvider>
      <Fab
        size={"lg"}
        mb={2}
        bg={"secondary.600"}
        onPress={() => setShowModal(true)}
        renderInPortal={false}
        icon={<AddIcon />}
      />

      <Modal
        shadow={1}
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
          <Modal.Header>Erstellen:</Modal.Header>
          <Modal.Body>
            <Button.Group space={2}>
              <Button
                size="lg"
                width={"50%"}
                onPress={() => navigation.navigate("CreateRecipeList")}
                colorScheme={"primary"}
                variant={"outline"}
              >
                Rezepteliste
              </Button>
              <Button
                size="lg"
                width={"50%"}
                onPress={() => navigation.navigate("CreateRecipe")}
                variant={"outline"}
                colorScheme={"secondary"}
              >
                Rezept
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Box m={4} shadow={1}>
        <FlatList
          data={inputList}
          renderItem={({ item, index }) => (
            <Box bg={"white"} borderRadius={8} marginY={2}>
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={item.key}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <TouchableOpacity
                  renderInPortal={false}
                  onPress={() => openDeleteModal(index)}
                >
                  <DeleteIcon size={"lg"} />
                </TouchableOpacity>
              </TouchableOpacity>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Modal
          shadow={1}
          isOpen={deleteModal}
          onClose={closeDeleteModal}
          _backdrop={{
            _dark: {
              bg: "coolGray.800",
            },
            bg: "warmGray.50",
          }}
        >
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Rezeptsammlung löschen?</Modal.Header>
            <Modal.Body>
              <Button.Group space={2}>
                <Button
                  onPress={deleteBook}
                  width={"100%"}
                  colorScheme={"secondary"}
                  variant={"outline"}
                >
                  Löschen
                </Button>
              </Button.Group>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </NativeBaseProvider>
  );
};

export default RecipeBooks;
