import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  View,
  Text,
  Input,
  Flex,
  Select,
  FormControl,
  CheckIcon,
  DeleteIcon,
  WarningOutlineIcon,
  Circle,
  Button,
  ScrollView,
  AddIcon,
  TextArea,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";

const CreateRecipe = ({ navigation }) => {
  const [recipes, setRecipes] = useState();
  const [ingredient, setIngredient] = useState([{}]);
  const [preparation, setPreparation] = useState([{ key: "", value: "" }]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDuration, setRecipeDuration] = useState("");
  const [recipeSteps, setRecipeSteps] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("recipes");
        const parsedRecipes = JSON.parse(storedRecipes) || [];
        setRecipes(parsedRecipes);
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  // Alle eingegebenen Daten lokal speichern
  const saveData = async () => {
    try {
      const newRecipe = {
        recipeTitle,
        recipeDuration,
        ingredient,
        recipeSteps,
      };
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);

      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const handlePress = (item) => {
    saveData();
    navigation.navigate("RecipeBooks");
  };

  // Input der Zutaten neu schreiben
  const handleAmountInput = (text, key) => {
    const tempIngredient = [...ingredient];
    tempIngredient[key].amount = text;
    setIngredient(tempIngredient);
  };

  const handleIngredientNameInput = (text, key) => {
    const tempIngredient = [...ingredient];
    tempIngredient[key].ingredient = text;
    setIngredient(tempIngredient);
  };

  // Zutaten-Inputs-Elemente hinzufügen
  const addHandlerZutaten = () => {
    const _ingredient = [...ingredient];
    _ingredient.push({});
    setIngredient(_ingredient);
  };

  const deleteHandlerZutaten = (key) => {
    const _ingredient = ingredient.filter((input, index) => index != key);
    setIngredient(_ingredient);
  };

  // Zubereitungsschritte-Inputs-Elemente hinzufügen
  const addHandlerZubereitung = () => {
    const _preparation = [...preparation];
    _preparation.push({ key: "", value: "" });
    setPreparation(_preparation);
  };

  const deleteHandlerZubereitung = (key) => {
    const _preparation = preparation.filter((input, index) => index != key);
    setPreparation(_preparation);
  };

  return (
    <NativeBaseProvider>
      <Flex p="3">
        {/* Titel */}
        <Input
          placeholder="Rezepttitel"
          variant="filled"
          size="lg"
          width="250"
          mx="auto"
          mt="1"
          mb="4"
          onChangeText={(text) => setRecipeTitle(text)}
          value={recipeTitle}
        />
        {/* Rezeptliste & Dauer */}
        <Flex mt="2">
          <Flex direction="row" mb="4">
            <Flex direction="column">
              <Text mt="2" mb="8">
                Rezeptliste:
              </Text>
              <Text>Dauer:</Text>
            </Flex>

            <Flex direction="column" width="100%">
              <FormControl ml="2" w="3/4" maxW="300" isRequired>
                <Select
                  maxWidth="100%"
                  height="9"
                  mb="4"
                  fontSize="sm"
                  accessibilityLabel="Rezeptliste wählen"
                  placeholder="Rezeptliste wählen"
                  _selectedItem={{
                    bg: "teal.900",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                >
                  <Select.Item label="Numero uno" value="1" />
                  <Select.Item label="Neue Rezeptliste erstellen" value="0" />
                </Select>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Bitte eine Auswahl treffen.
                </FormControl.ErrorMessage>
              </FormControl>
              <Input
                placeholder="Dauer eingeben"
                variant="filled"
                size="md"
                ml="2"
                width="75%"
                value={recipeDuration}
                onChangeText={(text) => setRecipeDuration(text)}
              />
            </Flex>
          </Flex>
          <ScrollView style={styles.scrollView}>
            {/* Zutaten */}
            <Text mt="2" fontSize="md">
              Zutaten
            </Text>
            <View>
              {ingredient.map((currentIngredient, key) => (
                <View key={key}>
                  <Flex direction="row" mt="2">
                    <Input
                      direction="column"
                      placeholder="Menge"
                      variant="filled"
                      size="md"
                      mr="2"
                      width="20%"
                      onChangeText={(text) => handleAmountInput(text, key)}
                      value={currentIngredient.amount}
                    />
                    <Input
                      direction="column"
                      placeholder="Zutat"
                      variant="filled"
                      size="md"
                      width="69%"
                      onChangeText={(text) =>
                        handleIngredientNameInput(text, key)
                      }
                      value={currentIngredient.ingredient}
                    />
                    <TouchableOpacity
                      onPress={() => deleteHandlerZutaten(key)}
                    >
                      <DeleteIcon m="2" />
                    </TouchableOpacity>
                  </Flex>
                </View>
              ))}
              {/* Neue Zeile hinzufügen - Button */}
              <Flex direction="row" mt="4" justifyContent="center">
                <Button
                  variant="unstyled"
                  title="Add"
                  onPress={addHandlerZutaten}
                >
                  <Circle size="40px" bg="lightgrey">
                    <AddIcon color="darkText" />
                  </Circle>
                </Button>
              </Flex>
            </View>
            {/* Zubereitung */}
            <Text mt="6" fontSize="md">
              Zubereitungsschritte
            </Text>
            <View>
              {preparation.map((input, key) => (
                <View key={key}>
                  <Flex direction="column" mt="2">
                    <Text mb="1">Schritt 1</Text>
                    <Flex direction="row">
                      <Button width="100" height="100" variant="outline">
                        <AddIcon color="info.600" />
                      </Button>
                      <TextArea
                        direction="column"
                        placeholder="Zubereitung"
                        variant="filled"
                        size="md"
                        ml="2"
                        width="62%"
                        h={100}
                        onChangeText={(text) => setRecipeSteps(text)}
                        value={recipeSteps}
                      />
                      <TouchableOpacity
                        onPress={() => deleteHandlerZubereitung(key)}
                      >
                        <DeleteIcon m="2" />
                      </TouchableOpacity>
                    </Flex>
                  </Flex>
                </View>
              ))}
              {/* Neue Zeile hinzufügen - Button */}
              <Flex direction="row" mt="4" justifyContent="center">
                <Button
                  variant="unstyled"
                  title="Add"
                  onPress={addHandlerZubereitung}
                >
                  <Circle size="40px" bg="lightgrey">
                    <AddIcon color="darkText" />
                  </Circle>
                </Button>
              </Flex>
            </View>
            {/* Eintrag speichern */}
            <Button mt="6" onPress={handlePress}>
              Speichern
            </Button>
          </ScrollView>
        </Flex>
      </Flex>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '77%',
    width: '100%',
    alignSelf: 'center',

  }
});

export default CreateRecipe;
