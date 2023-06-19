import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, View, Text, Input, Flex, Select, FormControl, CheckIcon, DeleteIcon, WarningOutlineIcon, Circle, Button, ScrollView, AddIcon, TextArea } from "native-base";
import { TouchableOpacity } from 'react-native';

const CreateRecipe = () => {
    // States fürs Kopieren der Inputfelder-Elemente
    const [inputsZutaten, setInputsZutaten] = useState([{}]);
    const [inputsZubereitung, setInputsZubereitung] = useState([{ key: '', value: '' }]);

    // States für Inhalt der Inputfelder
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDuration, setRecipeDuration] = useState("");
    const [recipeStep, setRecipeStep] = useState("");

    // State für das komplette neu erstellte Rezept
    const [inputRecipe, setInputRecipe] = useState("");

    // Alle eingegebenen Daten lokal speichern
    const saveData = async () => {
        try {
            const newRecipe = { recipeTitle, recipeDuration, inputsZutaten, recipeStep };
            const updatedRecipe = [...inputRecipe, newRecipe];
            setInputRecipe(updatedRecipe);

            await AsyncStorage.setItem("inputRecipe", JSON.stringify(updatedRecipe));
            console.log(updatedRecipe[0].inputsZutaten);
        } catch (error) {
            console.log("Error saving data:", error);
        }
    };

    // Input der Zutaten neu schreiben
    const handleAmountInput = (text, key) => {
        const tempInputsZutaten = [...inputsZutaten];
        tempInputsZutaten[key].amount = text;
        setInputsZutaten(tempInputsZutaten);
    };

    const handleIngredientNameInput = (text, key) => {
        const tempInputsZutaten = [...inputsZutaten];
        tempInputsZutaten[key].ingredient = text;
        setInputsZutaten(tempInputsZutaten);
    };

    // Zutaten-Inputs-Elemente hinzufügen
    const addHandlerZutaten = () => {
        const _inputsZutaten = [...inputsZutaten];
        _inputsZutaten.push({ });
        setInputsZutaten(_inputsZutaten);
    };

    const deleteHandlerZutaten = (key) => {
        const _inputsZutaten = inputsZutaten.filter((input, index) => index != key);
        setInputsZutaten(_inputsZutaten);
    };

    // Zubereitungsschritte-Inputs-Elemente hinzufügen
    const addHandlerZubereitung = () => {
        const _inputsZubereitung = [...inputsZubereitung];
        _inputsZubereitung.push({ key: '', value: '' });
        setInputsZubereitung(_inputsZubereitung);
    };

    const deleteHandlerZubereitung = (key) => {
        const _inputsZubereitung = inputsZubereitung.filter((input, index) => index != key);
        setInputsZubereitung(_inputsZubereitung);
    };

    return (
        <NativeBaseProvider>
            <ScrollView>
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
                        <Flex direction="row">
                            <Flex direction="column">
                                <Text mt="2" mb="8">Rezeptliste:</Text>
                                <Text>Dauer:</Text>
                            </Flex>

                            <Flex direction="column" width="100%">
                                <FormControl ml="2" w="3/4" maxW="300" isRequired>{/* isInvalid */}
                                    <Select maxWidth="100%" height="9" mb="4" fontSize="sm" accessibilityLabel="Rezeptliste wählen" placeholder="Rezeptliste wählen" _selectedItem={{
                                        bg: "teal.900",
                                        endIcon: <CheckIcon size={5} />
                                    }} mt="1">
                                        <Select.Item label="Numero uno" value="1" />
                                        <Select.Item label="Neue Rezeptliste erstellen" value="0" />
                                    </Select>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
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

                        {/* Zutaten */}
                        <Text mt="6" fontSize="md">Zutaten</Text>
                        <View>
                            <ScrollView>
                                {inputsZutaten.map((currentIngredient, key) => (
                                    <View>
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
                                                onChangeText={(text) => handleIngredientNameInput(text, key)}
                                                value={currentIngredient.ingredient}
                                            />
                                            <TouchableOpacity onPress={() => deleteHandlerZutaten(key)}>
                                                <DeleteIcon m="2" />
                                            </TouchableOpacity>
                                        </Flex>
                                    </View>
                                ))}
                            </ScrollView>
                            {/* Neue Zeile hinzufügen - Button */}
                            <Flex direction="row" mt="4" justifyContent="center">
                                <Button variant="unstyled" title="Add" onPress={addHandlerZutaten} >
                                    <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                                    </Circle>
                                </Button>
                            </Flex>
                        </View>

                        {/* Zubereitung */}
                        <Text mt="6" fontSize="md">Zubereitungsschritte</Text><View>
                            <ScrollView>
                                {inputsZubereitung.map((input, key) => (
                                    <View>
                                        <Flex direction="column" mt="2">
                                            <Text mb="1">Schritt 1</Text>
                                            <Flex direction="row">
                                                <Button width="100" height="100" variant="outline"><AddIcon color="info.600" /></Button>
                                                <TextArea
                                                    direction="column"
                                                    placeholder="Zubereitung"
                                                    variant="filled"
                                                    size="md"
                                                    ml="2"
                                                    width="62%"
                                                    h={100}
                                                    onChangeText={(text) => setRecipeStep(text)}
                                                    value={recipeStep}
                                                />
                                                <TouchableOpacity onPress={() => deleteHandlerZubereitung(key)}>
                                                    <DeleteIcon m="2" />
                                                </TouchableOpacity>
                                            </Flex>
                                        </Flex>
                                    </View>
                                ))}
                            </ScrollView>
                            {/* Neue Zeile hinzufügen - Button */}
                            <Flex direction="row" mt="4" justifyContent="center">
                                <Button variant="unstyled" title="Add" onPress={addHandlerZubereitung} >
                                    <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                                    </Circle>
                                </Button>
                            </Flex>
                        </View>

                        {/* Eintrag speichern */}
                        <Button mt="6" onPress={saveData}>
                            Speichern
                        </Button>
                    </Flex>
                </Flex>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;