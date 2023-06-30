import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { buttonStyles } from "../theme/Components";
import {
  NativeBaseProvider,
  Text,
  Flex,
  Checkbox,
  Button,
  Modal,
  Image,
  Box,
  Heading,
  Divider,
  ScrollView,
} from "native-base";

const Recipe = ({ route }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedIndex, setCheckedIndex] = useState([]);

  const recipeTitle = route.params.selectedItem.recipeTitle;
  const recipeDuration = route.params.selectedItem.recipeDuration;
  const recipeIngredientsList = route.params.selectedItem.ingredient;
  const recipeStepList = route.params.selectedItem.recipeSteps;
  const recipeImage = route.params.selectedItem.recipeImage;
  const stepImage = route.params.selectedItem.stepImage;

  // console.log(route.params.selectedItem.recipeBook);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIngredientsList = await AsyncStorage.getItem(
          "ingredientsList"
        );
        const parsedIngredientsList = JSON.parse(storedIngredientsList) || [];
        setIngredientsList(parsedIngredientsList);
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const addIngredientsToShoppinglist = async () => {
    try {
      const updatedIngredientsList = ingredientsList.concat(checkedIngredients);
      setIngredientsList(updatedIngredientsList);
      await AsyncStorage.setItem(
        "ingredientsList",
        JSON.stringify(updatedIngredientsList)
      );
      setDeleteModal(false);
      console.log("Data saved!");
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const handleChange = (index) => {
    return () => {
      setCheckedIndex((prevCheckedIndex) => {
        const isChecked = prevCheckedIndex.includes(index);
        setCheckedIngredients((prevCheckedIngredients) => {
          return [...prevCheckedIngredients, recipeIngredientsList[index]];
        });

        if (isChecked) {
          // Remove the ingredient if it is already checked
          return prevCheckedIndex.filter((item) => item !== index);
        } else {
          // Add the ingredient if it is not checked
          return [...prevCheckedIndex, index];
        }
      });
    };
  };

  return (
    <NativeBaseProvider>
      {/* conditional rendering */}
      <ScrollView>
        {recipeImage && (
          <Box shadow={2}>
            <Image
              source={{ uri: recipeImage }}
              style={{ width: "100%", height: 120 }}
              resizeMode="cover"
              alt="recipeImage"
            />
          </Box>
        )}
        <Box m={4}>
          <Heading size={"lg"}>{recipeTitle}</Heading>
          <Text mb={2}>{recipeDuration}</Text>
          <Divider mb={2} />
          <Heading size={"sm"} mb={2}>
            Zutaten
          </Heading>
          {recipeIngredientsList.map((ingredient, index) => {
            return (
              <Flex
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>
                  &#8226; {ingredient?.amount} {ingredient?.ingredient}
                </Text>
              </Flex>
            );
          })}
          <Divider my={2} />
          <Heading size={"sm"} mb={2}>
            Zubereitungsschritte
          </Heading>
          {recipeStepList.map((recipeSteps, index) => {
            return (
              <Flex key={index} direction="column" alignItems="left">
                {stepImage && (
                  <Image
                    source={{ uri: stepImage }}
                    style={{ width: 60, height: 60 }}
                    resizeMode="cover"
                    alt="recipeImage"
                  />
                )}
                <Text mb={2}>&#8226; {recipeSteps.stepText}</Text>
              </Flex>
            );
          })}
          <Divider mt={2} />

          <Flex alignItems={"center"}>
            <Button
              mt={8}
              onPress={() => setDeleteModal(true)}
              variant={"outline"}
              colorScheme={"success"}
            >
              Zu Einkaufszettel hinzufügen
            </Button>
          </Flex>
        </Box>

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
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Zutaten</Modal.Header>
            <Modal.Body>
              <Flex direction="column">
                {recipeIngredientsList.map((ingredient, index) => {
                  return (
                    <Flex
                      my={2}
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text>
                        {ingredient?.amount} {ingredient?.ingredient}
                      </Text>
                      <Checkbox
                        onChange={handleChange(index)}
                        isChecked={checkedIndex.includes(index)}
                        accessibilityLabel="done"
                      />
                    </Flex>
                  );
                })}
              </Flex>
              <Button.Group space={2}>
                <Button
                  onPress={addIngredientsToShoppinglist}
                  width={"100%"}
                  colorScheme={"success"}
                  my={2}
                >
                  Hinzufügen
                </Button>
              </Button.Group>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Recipe;
