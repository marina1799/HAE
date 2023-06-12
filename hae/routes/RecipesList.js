import { NativeBaseProvider, Button, Text, Flex } from "native-base";

const RecipesList = ({ route }) => {
  const { selectedItem } = route.params;

  return (
    <NativeBaseProvider>
      <Flex direction="row-reverse">
      </Flex>
      <Flex direction="row" p="3">
        <Text>Rezepteliste:</Text>
      </Flex>
      <Text>{selectedItem.bookName}</Text>
      <Text>{selectedItem.bookDescription}</Text>
    </NativeBaseProvider>
  );
};

export default RecipesList;
