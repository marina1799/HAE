import React from 'react';
import { NativeBaseProvider, Button, Flex, Text } from 'native-base';

const RecipesList = ({ navigation, route }) => {
  const selectedItem = route.params.selectedItem; // Das ausgewählte Objekt aus route.params abrufen

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
      <Flex direction="row-reverse">
        <Button
          size="lg"
          variant="unstyled"
          onPress={() => navigation.navigate("CreateRecipe")}
        >
          <Text color="primary.400" underline>
            Rezept erstellen
          </Text>
        </Button>
      </Flex>

      <Text>{selectedItem.bookName}</Text>
      <Text>{selectedItem.bookDescription}</Text>
      
      <Flex direction="row-reverse"></Flex>
    </NativeBaseProvider>
  );
};

export default RecipesList;
