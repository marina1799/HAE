import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NativeBaseProvider,
  View,
  Text,
  Input,
  Flex,
  Select,
  DeleteIcon,
  Circle,
  Button,
  ScrollView,
  AddIcon,
  TextArea,
  Image,
  Box,
  Heading,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateRecipe = ({ navigation }) => {
  const [recipes, setRecipes] = useState();
  const [ingredient, setIngredient] = useState([{}]);
  const [preparation, setPreparation] = useState([{}]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDuration, setRecipeDuration] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([{}]);
  const [recipeImage, setRecipeImage] = useState(null);
  const [stepImage, setStepImage] = useState([]);
  const [recipeBook, setRecipeBook] = useState("");
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // recipes fetching
        const storedRecipes = await AsyncStorage.getItem("recipes");
        const parsedRecipes = JSON.parse(storedRecipes) || [];
        setRecipes(parsedRecipes);

        // inputList fetching
        const storedInputList = await AsyncStorage.getItem("inputList");
        const parsedInputList = JSON.parse(storedInputList);
        setInputList(parsedInputList || []);
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
        recipeImage,
        stepImage,
        recipeBook,
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

  // Input der Zubereitungsschritte neu schreiben
  const handleStepTextInput = (text, key) => {
    const tempSteps = [...recipeSteps];
    if (!tempSteps[key]) {
      tempSteps[key] = {};
    }
    tempSteps[key].stepText = text;
    setRecipeSteps(tempSteps);
  };

  // Zubereitungsschritte-Inputs-Elemente hinzufügen
  const addHandlerZubereitung = () => {
    const _preparation = [...preparation];
    _preparation.push({});
    setPreparation(_preparation);
  };

  const deleteHandlerZubereitung = (key) => {
    const _preparation = preparation.filter((input, index) => index != key);
    setPreparation(_preparation);
  };

  //image picker recipe
  const pickRecipeImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setRecipeImage(result.assets[0].uri);
    }
  };

  const deleteRecipeImage = () => {
    setRecipeImage(null);
  };

  //image picker recipe step
  const pickStepImage = async (key) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const tempStepImages = [...stepImage];
      tempStepImages[key] = result.assets[0].uri;
      setStepImage(tempStepImages);
    }
  };

  const deleteStepImage = (key) => {
    const tempStepImages = [...stepImage];
    tempStepImages[key] = null;
    setStepImage(tempStepImages);
  };

  return (
    <NativeBaseProvider>
      <Select
        mx={4}
        mt={4}
        size={"lg"}
        accessibilityLabel="Rezeptliste"
        placeholder="Rezeptliste"
        onValueChange={(itemValue) => setRecipeBook(itemValue)}
      >
        {inputList.map((item, index) => {
          return (
            <Select.Item
              label={item.bookName}
              value={item.bookName}
              key={index}
            />
          );
        })}
      </Select>
      <ScrollView>
        <Box m={4}>
          <>
            {!recipeImage && (
              <Button
                width={"100%"}
                height={"120"}
                variant={"outline"}
                colorScheme={"success"}
                onPress={pickRecipeImage}
              >
                Bild hinzufügen
              </Button>
            )}
            {recipeImage && (
              <Flex mb={2}>
                <Flex>
                  <TouchableOpacity onPress={pickRecipeImage}>
                    <Image
                      source={{ uri: recipeImage }}
                      style={{ width: "100%", height: 120 }}
                      alt="recipeImage"
                    />
                  </TouchableOpacity>
                </Flex>
                <Flex alignItems={"center"} my={2}>
                  <Button
                    variant={"outline"}
                    colorScheme={"secondary"}
                    onPress={deleteRecipeImage}
                  >
                    Bild löschen
                  </Button>
                </Flex>
              </Flex>
            )}
          </>
          <Flex>
            <Input
              my={2}
              placeholder="Titel"
              variant="filled"
              size="lg"
              width="100%"
              onChangeText={(text) => setRecipeTitle(text)}
              value={recipeTitle}
            />

            <Input
              my={2}
              placeholder="Zubereitungsdauer"
              variant="filled"
              size="lg"
              value={recipeDuration}
              onChangeText={(text) => setRecipeDuration(text)}
            />

            {/* Zutaten */}
            <Heading size={"sm"} my={2}>
              Zutaten
            </Heading>
            {ingredient.map((currentIngredient, key) => (
              <Flex
                my={2}
                direction={"row"}
                key={key}
                justifyContent={"space-between"}
              >
                <Flex flexDirection={"row"}>
                  <Input
                    mr={4}
                    direction="column"
                    placeholder="Menge"
                    variant="filled"
                    size="lg"
                    width={"25%"}
                    onChangeText={(text) => handleAmountInput(text, key)}
                    value={currentIngredient.amount}
                  />
                  <Input
                    direction="column"
                    placeholder="Zutat"
                    variant="filled"
                    size="lg"
                    width={"60%"}
                    onChangeText={(text) =>
                      handleIngredientNameInput(text, key)
                    }
                    value={currentIngredient.ingredient}
                  />
                </Flex>
                <Flex justifyContent={"center"} mr={1}>
                  <TouchableOpacity onPress={() => deleteHandlerZutaten(key)}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </Flex>
              </Flex>
            ))}
            <Flex direction={"row"} justifyContent={"center"}>
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
            <Heading my={2} size={"sm"}>
              Zubereitungsschritte
            </Heading>
            <View>
              {preparation.map((currentPreparation, key) => (
                <Flex direction="column" key={key}>
                  <Text my={2}>Schritt {key + 1}</Text>
                  <Flex direction="row">
                    <>
                      {!stepImage[key] && (
                        <Button
                          mr={2}
                          width="100"
                          height="100"
                          variant="outline"
                          onPress={() => pickStepImage(key)}
                        >
                          <AddIcon color="info.600" />
                        </Button>
                      )}
                      {stepImage[key] && (
                        <Flex>
                          <TouchableOpacity onPress={() => pickStepImage(key)}>
                            <Image
                              borderRadius={8}
                              mr={2}
                              source={{ uri: stepImage[key] }}
                              style={{ width: 100, height: 100 }}
                              alt="stepImage"
                            />
                          </TouchableOpacity>
                          <Button
                            my={2}
                            variant={"outline"}
                            colorScheme={"secondary"}
                            onPress={() => deleteStepImage(key)}
                          >
                            Bild löschen
                          </Button>
                        </Flex>
                      )}
                    </>
                    <TextArea
                      direction="column"
                      placeholder="Zubereitung"
                      variant="filled"
                      size="lg"
                      width="60%"
                      h={100}
                      onChangeText={(text) => handleStepTextInput(text, key)}
                      value={currentPreparation.stepText}
                    />
                    <TouchableOpacity
                      onPress={() => deleteHandlerZubereitung(key)}
                    >
                      <DeleteIcon ml={8} />
                    </TouchableOpacity>
                  </Flex>
                </Flex>
              ))}
              <Flex direction="row" justifyContent="center">
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
            <Button colorScheme={"success"} onPress={handlePress}>
              Speichern
            </Button>
          </Flex>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CreateRecipe;
