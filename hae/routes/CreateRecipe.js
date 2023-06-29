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
  Image,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateRecipe = ({ navigation }) => {
  const [recipes, setRecipes] = useState();
  const [ingredient, setingredient] = useState([{}]);   //ingredient!!
  const [preparation, setPreparation] = useState([{}]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDuration, setRecipeDuration] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([{}]);
  const [recipeImage, setRecipeImage] = useState(null);
  const [stepImage, setStepImage] = useState(null);

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
        recipeImage,
        stepImage,
      };
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
      console.log(newRecipe);


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
    const tempingredient = [...ingredient];
    tempingredient[key].amount = text;
    setingredient(tempingredient);
  };


  const handleingredientNameInput = (text, key) => {
    const tempingredient = [...ingredient];
    tempingredient[key].ingredient = text;
    setingredient(tempingredient);
  };

  // Zutaten-Inputs-Elemente hinzufügen
  const addHandlerZutaten = () => {
    const _ingredient = [...ingredient];
    _ingredient.push({});
    setingredient(_ingredient);
  };


  const deleteHandlerZutaten = (key) => {
    const _ingredient = ingredient.filter((input, index) => index != key);
    setingredient(_ingredient);
  };


  // Input der Zubereitungsschritte neu schreiben
  const handleStepTextInput = (text, key) => {
    const tempsteps = [...recipeSteps];
    if (!tempsteps[key]) {
      tempsteps[key] = {};
    }
    tempsteps[key].stepText = text;
    setRecipeSteps(tempsteps);
    console.log(key, tempsteps);
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

    if (!result.cancelled) {
      setRecipeImage(result.uri);
    }
  };

  const deleteRecipeImage = () => {
    setRecipeImage(null);
  };

  //image picker recipe step
  const pickStepImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setStepImage(result.uri);
    }
  };

  const deleteStepImage = () => {
    setStepImage(null);
  };

  return (
    <NativeBaseProvider>
      {/* Recipe Image */}
      <>
        {!recipeImage && (
          <Button
            width="400"
            height="300"
            variant="outline"
            mb="4"
            onPress={pickRecipeImage}
          >
            Bild hinzufügen
          </Button>
        )}
        {recipeImage && (
          <Flex mb="10">
            <TouchableOpacity onPress={pickRecipeImage}>
              <Image
                source={{ uri: recipeImage }}
                style={{ width: 400, height: 300 }}
                alt="recipeImage"
                mb="4"
              />
            </TouchableOpacity>
            <Button title="Bild löschen" onPress={deleteRecipeImage}>
              Bild löschen
            </Button>
          </Flex>
        )}
      </>
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
              {ingredient.map((currentingredient, key) => (
                <View key={key}>
                  <Flex direction="row" mt="2">
                    <Input
                      direction="column"
                      placeholder="Menge"
                      variant="filled"
                      size="md"
                      mr="2"
                      width="20%"
                      onChangeText={(text) =>
                        handleAmountInput(text, key)}
                      value={currentingredient.amount}
                    />
                    <Input
                      direction="column"
                      placeholder="Zutat"
                      variant="filled"
                      size="md"
                      width="69%"
                      onChangeText={(text) =>
                        handleingredientNameInput(text, key)
                      }
                      value={currentingredient.ingredient}
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
              {preparation.map((currentpreparation, key) => (
                <View key={key}>
                  <Flex direction="column" mt="2">
                    <Text mb="1">Schritt 1</Text>
                    <Flex direction="row">
                      {/* Recipestep Image*/}
                      <>
                        {!stepImage && (
                          <Button
                            width="100"
                            height="100"
                            variant="outline"
                            onPress={pickStepImage}
                          >
                            <AddIcon color="info.600" />
                          </Button>
                        )}
                        {stepImage && (
                          <Flex mb="10">
                            <TouchableOpacity onPress={pickStepImage}>
                              <Image
                                source={{ uri: stepImage }}
                                style={{ width: 100, height: 100 }}
                                alt="stepImage"
                                mb="4"
                                onPress={pickStepImage}
                              />
                            </TouchableOpacity>
                            <Button
                              title="Bild löschen"
                              onPress={deleteStepImage}
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
                        size="md"
                        ml="2"
                        width="62%"
                        h={100}
                        onChangeText={(text) =>
                          handleStepTextInput(text, key)}
                        value={currentpreparation.stepText}
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
    </NativeBaseProvider >
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',

  }
});

export default CreateRecipe;
