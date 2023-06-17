import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Input, Button } from "native-base";
import { buttonStyles } from '../theme/Components';
import ImageUpload from '../components/FileSystem';

const CreateRecipeList = ({ navigation }) => {
  const [bookName, setBookName] = useState("");
  const [bookDescription, setDescription] = useState("");
  const [inputList, setInputList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (bookName === '' || bookDescription === '') {
      setErrorMessage('Bitte füllen Sie alle Felder aus.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } else {
      try {
        const newBook = { bookName, bookDescription };
        const updatedInputList = [...inputList, newBook];
  
        await AsyncStorage.setItem("inputList", JSON.stringify(updatedInputList));
        console.log("Data saved successfully!");
  
        setInputList(updatedInputList);
        console.log("Updated inputList:", updatedInputList);
  
        navigation.navigate("RecipeBooks");
      } catch (error) {
        console.log("Error saving data:", error);
      }
      setErrorMessage(''); 
    }
  };

  const handleImageSelected = (imageUri) => {
    console.log('Selected image URI:', imageUri);
  };

  return (
    <NativeBaseProvider>
      <ImageUpload onImageSelected={handleImageSelected} />
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
      {errorMessage !== '' && <Text>{errorMessage}</Text>}
    </NativeBaseProvider>
  );
};

export default CreateRecipeList;
