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
} from "native-base";

const Recipe = ({ navigation, route }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [ingredientList, setingredientList] = useState([]);
  const [checkedingredient, setCheckedingredient] = useState([]);
  const [checkedIndex, setCheckedIndex] = useState([]);

  const recipeTitle = route.params.selectedItem.recipeTitle;
  const recipeDuration = route.params.selectedItem.recipeDuration;
  const recipeingredientList = route.params.selectedItem.ingredient;
  const recipeStep = route.params.selectedItem.recipeSteps;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedingredientList = await AsyncStorage.getItem(
          "ingredientList"
        );
        const parsedingredientList = JSON.parse(storedingredientList) || [];
        setingredientList(parsedingredientList);
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  const addingredientToShoppinglist = async () => {
    try {
      const updatedingredientList = ingredientList.concat(checkedingredient);
      setingredientList(updatedingredientList);
      await AsyncStorage.setItem(
        "ingredientList",
        JSON.stringify(updatedingredientList)
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
        setCheckedingredient((prevCheckedingredient) => {
          return [...prevCheckedingredient, recipeingredientList[index]];
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

  // console.log(checkedIndex);

  return (
    <NativeBaseProvider>
      <Text>Titel: {recipeTitle}</Text>
      <Text>Dauer: {recipeDuration}</Text>
      {recipeingredientList.map((ingredient, index) => {
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
      <Text>Zubereitungsschritte: {recipeStep}</Text>

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
              {recipeingredientList.map((ingredient, index) => {
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
                onPress={addingredientToShoppinglist}
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
