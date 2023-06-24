import React from "react";
import { useState } from "react";
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

  const recipeTitle = route.params.selectedItem.recipeTitle;
  const recipeDuration = route.params.selectedItem.recipeDuration;
  const ingredientsList = route.params.selectedItem.ingredients;
  const recipeStep = route.params.selectedItem.recipeSteps;

  return (
    <NativeBaseProvider>
      <Text>Titel: {recipeTitle}</Text>
      <Text>Dauer: {recipeDuration}</Text>
      {ingredientsList.map((ingredient, index) => {
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
              {ingredientsList.map((ingredient, index) => {
                return (
                  <Flex
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>
                      {ingredient?.amount} {ingredient?.ingredients}
                    </Text>
                    <Checkbox isChecked={false} accessibilityLabel="done" />
                  </Flex>
                );
              })}
            </Flex>
            <Button.Group space={2}>
              <Button style={buttonStyles.primaryButton}>
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
