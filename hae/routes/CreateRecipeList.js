import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Input, Button, Image } from "native-base";
import { buttonStyles } from "../theme/Components";
import * as ImagePicker from "expo-image-picker";
import { uploadImage, deleteImage } from "../components/FileSystem";

const CreateRecipeList = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setDescription] = useState("");
  const [inputList, setInputList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedInputList = await AsyncStorage.getItem("inputList");
        if (storedInputList) {
          setInputList(JSON.parse(storedInputList));
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addBook = async () => {
    if (bookName === "" || bookDescription === "") {
      setErrorMessage("Bitte füllen Sie alle Felder aus.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      try {
        const newBook = { bookName, bookDescription };
        const updatedInputList = [...inputList, newBook];

        await AsyncStorage.setItem(
          "inputList",
          JSON.stringify(updatedInputList)
        );
        console.log("Data saved successfully!");

        setInputList(updatedInputList);
        console.log("Updated inputList:", updatedInputList);

        navigation.navigate("RecipeBooks");
      } catch (error) {
        console.log("Error saving data:", error);
      }
      setErrorMessage("");
    }
  };

  //file system
  const handleImageUpload = async () => {
    // Image Picker-Berechtigungen überprüfen
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied!");
      return;
    }

    // Bild auswählen
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileName = `recipe_${Date.now()}.jpg`;

      // Bild hochladen
      const fileUri = await uploadImage(imageUri, fileName);

      // Dateipfad in deinem Datenmodell oder Zustand speichern
      setRecipeImage(fileUri);
    }
  };

  const handleImageDelete = async () => {
    if (recipeImage) {
      // Dateipfad aus deinem Datenmodell oder Zustand erhalten
      const fileUri = recipeImage;
  
      // Bild löschen
      await deleteImage(fileUri);
  
      // Dateipfad aus deinem Datenmodell oder Zustand entfernen
      setRecipeImage(null);
    }
  };

  return (
    <NativeBaseProvider>
      <Input
        placeholder="Name"
        width="100%"
        mt="28"
        onChangeText={(text) => setBookName(text)}
        value={bookName}
      />
      <Input
        placeholder="Beschreibung"
        width="100%"
        mt="28"
        onChangeText={(text) => setDescription(text)}
        value={bookDescription}
      />
      <Button style={buttonStyles.primaryButton} onPress={addBook}>
        <Text>Hinzufügen</Text>
      </Button>
      {errorMessage !== "" && <Text>{errorMessage}</Text>}

      <Button onPress={handleImageUpload}>Bild Hinzufügen</Button>
      {recipeImage && (
        <>
          <Image source={{ uri: recipeImage }} style={styles.recipeImage} />
          <Button
            title="Bild löschen"
            onPress={handleImageDelete}
            style={styles.deleteButton}
          >
            Bild löschen
          </Button>
        </>
      )}
    </NativeBaseProvider>
  );
};

export default CreateRecipeList;

const styles = {
  recipeImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
};
