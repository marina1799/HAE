import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Input, Button, Image } from "native-base";
import { buttonStyles } from "../theme/Components";
import * as ImagePicker from "expo-image-picker";

const CreateRecipeList = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setDescription] = useState("");
  const [inputList, setInputList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

// Update the addBook function to include the selectedImage in the newBook object
const addBook = async () => {
  if (bookName === "" || bookDescription === "") {
    setErrorMessage("Bitte füllen Sie alle Felder aus.");
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  } else {
    try {
      const newBook = {
        bookName,
        bookDescription,
        selectedImage
      };
      const updatedInputList = [...inputList, newBook];

      await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
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


  //images
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
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

      <Button onPress={pickImage}>Bild Hinzufügen</Button>

      {selectedImage && (
  <NativeBaseProvider style={{ alignItems: 'center' }}>
    <Image
      source={{ uri: selectedImage }}
      style={{ width: 200, height: 200 }}
    />
    <Button title="Bild löschen" onPress={deleteImage}>Bild löschen</Button>
  </NativeBaseProvider>
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
