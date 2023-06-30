import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Modal,
  Button,
  Box,
  Text,
  Fab,
  FlatList,
  DeleteIcon,
  AddIcon,
  Flex,
} from "native-base";
import { FabStyles } from "../theme/Components";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const RecipesList = ({ navigation, route }) => {
  const recipeBook = route.params.selectedItem.bookName; // Das ausgewählte Objekt aus route.params abrufen
  const [recipes, setRecipes] = useState([]);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);
  const [deleteRecipeIndex, setDeleteRecipeIndex] = useState(null);
  const [recipeBookNames, setRecipeBookNames] = useState([]);

  useEffect(() => {
    // Filter the recipes array based on bookName
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.recipeBook === recipeBook
    );

    // Update the bookNameRecipes array
    setRecipeBookNames(filteredRecipes);
  }, [recipes, recipeBook]);

  const fetchData = async () => {
    try {
      const storedInputList = await AsyncStorage.getItem("recipes");
      const parsedInputList = JSON.parse(storedInputList);

      setRecipes(parsedInputList || []);
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const deleteRecipe = async () => {
    if (deleteRecipeIndex !== null) {
      const updatedRecipe = [...recipes];
      updatedRecipe.splice(deleteRecipeIndex, 1);
      setRecipes(updatedRecipe);
      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipe)); // Korrekter Key "recipes" statt "inputList"
      console.log("Data saved!");
      setDeleteRecipeModal(false);
    }
  };

  const openDeleteRecipeModal = (index) => {
    setDeleteRecipeIndex(index);
    setDeleteRecipeModal(true);
  };

  const closeDeleteRecipeModal = () => {
    setDeleteRecipeModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const DisplayImage = ({ recipeImage }) => {
    return (
      <View>
        {recipeImage && (
          <Image
            source={{ uri: recipeImage }}
            style={{ width: 200, height: 200 }}
            alt="recipeImage"
          />
        )}
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <Box m={4} shadow={1}>
        <FlatList
          data={recipeBookNames}
          renderItem={({ item, index }) => (
            <Box bg={"white"} borderRadius={8} marginY={2}>
              <TouchableOpacity
                key={item.key}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Recipe", { selectedItem: item })
                }
              >
                <Flex flexDirection={"row"}>
                  {item.recipeImage && (
                    <Image
                      source={{ uri: item.recipeImage }}
                      style={{ width: 40, height: 40, marginRight: 8 }}
                      resizeMode="cover"
                      alt="recipeImage"
                    />
                  )}
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
                </Flex>
                <TouchableOpacity
                  renderInPortal={false}
                  onPress={() => openDeleteRecipeModal(index)}
                >
                  <DeleteIcon size={"lg"} />
                </TouchableOpacity>

                <Modal
                  shadow={1}
                  isOpen={deleteRecipeModal}
                  onClose={closeDeleteRecipeModal}
                  _backdrop={{
                    _dark: {
                      bg: "coolGray.800",
                    },
                    bg: "warmGray.50",
                  }}
                >
                  <Modal.Content maxWidth="350" maxH="212">
                    <Modal.CloseButton />
                    <Modal.Header>Rezept löschen?</Modal.Header>
                    <Modal.Body>
                      <Button.Group space={2}>
                        <Button
                          onPress={deleteRecipe}
                          width={"100%"}
                          variant={"outline"}
                          colorScheme={"secondary"}
                        >
                          Löschen
                        </Button>
                      </Button.Group>
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
              </TouchableOpacity>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>

      <Fab
        size={"lg"}
        mb={2}
        bg={"secondary.600"}
        onPress={() => navigation.navigate("CreateRecipe")}
        renderInPortal={false}
        icon={<AddIcon />}
      />
    </NativeBaseProvider>
  );
};

export default RecipesList;
