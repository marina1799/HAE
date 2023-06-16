import React, { useState } from "react";
import { NativeBaseProvider, View, Text, Input, TextInput, Flex, Select, FormControl, CheckIcon, WarningOutlineIcon, Circle, Button, ScrollView, AddIcon, TextArea } from "native-base";
import DynamicTextInput from "../components/dynamicTextInput";

const CreateRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [input, setInput] = React.useState(['']);

    const handleAdd = () => {
        const newInputs = [...input];
        newInputs.push('');
        setInput(newInputs);
    };

    const handleRemove = () => {
        const newInputs = [...input];
        newInputs.splice(index, 1),
            setInput(newInputs);
    };

    const handleInputChange = (text, index) => {
        const newInputs = [...input];
        newInputs[index] = text;
        setInput(newInputs);
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

                    {/* Mini Infos */}
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
                        <Flex direction="row" mt="2">
                            <Input
                                direction="column"
                                placeholder="Menge"
                                variant="filled"
                                size="md"
                                mr="2"
                                width="20"
                                onChangeText={(text) => setRecipeTitle(text)}
                                value={recipeTitle}
                            />
                            <Input
                                direction="column"
                                placeholder="Zutat"
                                variant="filled"
                                size="md"
                                width="75%"
                                onChangeText={(text) => setRecipeTitle(text)}
                                value={recipeTitle}
                            />
                        </Flex>
                        <Flex direction="row" mt="4" justifyContent="center">
                            <Button variant="unstyled">
                                <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                                </Circle>
                            </Button>
                        </Flex>

                        <DynamicTextInput></DynamicTextInput>

                        {/* Zutaten 2 */}
                        <Text mt="6" fontSize="md">Zutaten</Text>
                        <Flex direction="row" mt="2">
                            {/* <View>
                                {input.map((input, index) => (
                                    <View key={index}>
                                        <TextInput
                                            style={{ borderWidth: 1, marginVertical: 5 }}                             //dynamicTextInput nicht als Komponente sondern komplett raus in "CreateRecipe"
                                            value={input}
                                            onChangeText={text => handleInputChange(text, index)}
                                        />
                                        <Button title="remove" onPress={() => handleRemove(index)} />
                                    </View>
                                ))}
                            </View> */}
                            <Input
                                direction="column"
                                placeholder="Zutat"
                                variant="filled"
                                size="md"
                                width="75%"
                                onChangeText={(text) => setRecipeTitle(text)}
                                value={recipeTitle}
                            />
                        </Flex>
                        <Flex direction="row" mt="4" justifyContent="center">
                            <Button variant="unstyled">
                                <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                                </Circle>
                            </Button>
                        </Flex>

                        {/* Zubereitung */}
                        <Text mt="6" fontSize="md">Zubereitungsschritte</Text>
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
                                    width="69%"
                                    h={100}
                                    onChangeText={(text) => setRecipeTitle(text)}
                                    value={recipeTitle}
                                />
                            </Flex>
                        </Flex>
                        <Flex direction="row" mt="4" justifyContent="center">
                            <Button variant="unstyled">
                                <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                                </Circle>
                            </Button>
                        </Flex>
                        <Button mt="6">Speichern</Button>
                    </Flex>
                </Flex>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;