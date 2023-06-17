import React, { useState } from "react";
import { NativeBaseProvider, View, Text, Input, Flex, Select, FormControl, CheckIcon, DeleteIcon, WarningOutlineIcon, Circle, Button, ScrollView, AddIcon, TextArea } from "native-base";
import { TouchableOpacity } from 'react-native'

const CreateRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [inputsZutaten, setInputsZutaten] = useState([{ key: '', value: '' }]);
    const [inputsZubereitung, setInputsZubereitung] = useState([{ key: '', value: '' }]);

    // Zutaten-Inputs hinzufügen
    const addHandlerZutaten = () => {
        const _inputsZutaten = [...inputsZutaten];
        _inputsZutaten.push({ key: '', value: '' });
        setInputsZutaten(_inputsZutaten);
    };

    const deleteHandlerZutaten = (key) => {
        const _inputsZutaten = inputsZutaten.filter((input, index) => index != key);
        setInputsZutaten(_inputsZutaten);
    };

    const inputHandlerZutaten = (text, key) => {
        const _inputsZutaten = [...inputsZutaten];
        _inputsZutaten[key].value = text;
        _inputsZutaten[key].key = key;
        setInputsZutaten(_inputsZutaten);
    };

    // Zubereitungsschritte-Inputs hinzufügen
    const addHandlerZubereitung = () => {
        const _inputsZubereitung = [...inputsZubereitung];
        _inputsZubereitung.push({ key: '', value: '' });
        setInputsZubereitung(_inputsZubereitung);
    };

    const deleteHandlerZubereitung = (key) => {
        const _inputsZubereitung = inputsZubereitung.filter((input, index) => index != key);
        setInputsZubereitung(_inputsZubereitung);
    };

    const inputHandlerZubereitung = (text, key) => {
        const _inputsZubereitung = [...inputsZubereitung];
        _inputsZubereitung[key].value = text;
        _inputsZubereitung[key].key = key;
        setInputsZutaten(_inputsZubereitung);
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
                                    onChangeText={(text) => setRecipeTitle(text)}
                                    value={recipeTitle}
                                />
                            </Flex>
                        </Flex>

                        {/* Zutaten */}
                        <Text mt="6" fontSize="md">Zutaten</Text>
                        <View>
                            <ScrollView>
                                {inputsZutaten.map((input, key) => (
                                    <View>
                                        <Flex direction="row" mt="2">
                                            <Input
                                                direction="column"
                                                placeholder="Menge"
                                                variant="filled"
                                                size="md"
                                                mr="2"
                                                width="20%"
                                                onChangeText={(text) => inputHandlerZutaten(text, key)}
                                                value={input.value}
                                            />
                                            <Input
                                                direction="column"
                                                placeholder="Zutat"
                                                variant="filled"
                                                size="md"
                                                width="69%"
                                                onChangeText={(text) => inputHandlerZutaten(text, key)}
                                                value={input.value}
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
                                                    onChangeText={(text) => inputHandlerZubereitung(text, key)}
                                                    value={input.value}
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
                        <Button mt="6">Speichern</Button>
                    </Flex>
                </Flex>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;