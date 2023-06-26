import React, { useState } from "react";
import {
  NativeBaseProvider,
  Modal,
  Button,
  Flex,
  Text,
  Fab,
  FlatList,
  DeleteIcon,
  AddIcon,
} from "native-base";
import { FabStyles } from "../theme/Components";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { buttonStyles } from "../theme/Components";

const RecipesList = ({ navigation, route }) => {
  const item = route.params.selectedItem; // Das ausgewählte Objekt aus route.params abrufen
  const [recipes, setRecipes] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchData = async () => {
    try {
      const storedInputList = await AsyncStorage.getItem("recipes");
      const parsedInputList = JSON.parse(storedInputList);

      setRecipes(parsedInputList || []);
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const deleteRecipe = async (index) => {
    const updatedRecipe = [...recipes];
    updatedRecipe.splice(index, 1);
    setRecipes(updatedRecipe);
    await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipe));
    console.log("Data saved!");

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
            style={{ width: "100%", height: 200, marginRight: 8 }}
            resizeMode="cover"
            alt="selectedImage"
          />
        )}
      </Flex>

      <FlatList
        data={recipes}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.key}
            style={{
              marginTop: 2,
              backgroundColor: "white",
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
            <TouchableOpacity
              renderInPortal={false}
              onPress={() => setDeleteModal(true)}
            >
              <DeleteIcon size={"lg"} />
            </TouchableOpacity>

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
                <Modal.Header>Rezept löschen?</Modal.Header>
                <Modal.Body>
                  <Button.Group space={2}>
                    <Button
                      style={buttonStyles.primaryButton}
                      onPress={() => deleteRecipe(index)}
                      width={"100%"}
                    >
                      <Text>Löschen</Text>
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
        size={"lg"}
        style={FabStyles.primaryFab}
        onPress={() => navigation.navigate("CreateRecipe")}
        renderInPortal={false}
        icon={<AddIcon />}
      />
    </NativeBaseProvider>
  );
};

export default RecipesList;
