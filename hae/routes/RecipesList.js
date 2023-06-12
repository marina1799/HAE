import { NativeBaseProvider, Fab, Text, Flex, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const RecipesList = ({ route, navigation }) => {
  const { selectedItem } = route.params;

  return (
    <NativeBaseProvider>
      <Flex direction="row-reverse"></Flex>
      <Flex direction="row" p="3">
        <Text>Rezepteliste:</Text>
      </Flex>
      <Text>{selectedItem.bookName}</Text>
      <Text>{selectedItem.bookDescription}</Text>
    </NativeBaseProvider>
  );
};

export default RecipesList;
