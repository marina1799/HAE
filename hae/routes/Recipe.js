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
} from "native-base";

const Recipe = ({ navigation, route }) => {
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

  console.log(route.params.selectedItem.stepImage[0]);

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
      <Image
        source={{ uri: recipeImage }}
        style={{ width: 40, height: 40, marginRight: 8 }}
        resizeMode="cover"
        alt="recipeImage"
      />
      <Text>Titel: {recipeTitle}</Text>
      <Text>Dauer: {recipeDuration}</Text>
      {recipeIngredientsList.map((ingredient, index) => {
        return (
          <Flex
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>
              Menge: {ingredient?.amount}, Zutat: {ingredient?.ingredient}
            </Text>
          </Flex>
        );
      })}
      {recipeStepList.map((recipeSteps, index) => {
        return (
          <Flex
            key={index}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              source={{ uri: stepImage[index] }}
              style={{ width: 40, height: 40, marginRight: 8 }}
              resizeMode="cover"
              alt="recipeImage"
              key={index}
            />

            <Text>Zubereitungsschritte: {recipeSteps.stepText}</Text>
          </Flex>
        );
      })}

      <Button onPress={() => setDeleteModal(true)} renderInPortal={false}>
        <Text>Zu Einkaufszettel hinzufügen</Text>
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
          <Modal.Header>Zutaten</Modal.Header>
          <Modal.Body>
            <Flex direction="column">
              {recipeIngredientsList.map((ingredient, index) => {
                return (
                  <Flex
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
                style={buttonStyles.primaryButton}
                onPress={addIngredientsToShoppinglist}
                width={"100%"}
              >
                <Text>Hinzufügen</Text>
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

export default Recipe;
