import { NativeBaseProvider, Button, Text, Flex } from "native-base";

const RecipesList = ({ navigation }) => {
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
      <Flex direction="row-reverse"></Flex>
      <Flex direction="row" p="3">
        <Text>Rezepteliste:</Text>
      </Flex>
    </NativeBaseProvider>
  );
};

export default RecipesList;
