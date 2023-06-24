import React from "react";
import { NativeBaseProvider, Text, Flex, Checkbox } from "native-base";

const Recipe = ({ navigation, route }) => {
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
    </NativeBaseProvider>
  );
};

export default Recipe;
