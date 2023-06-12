import React, { useState } from "react";
import { NativeBaseProvider, Text, Input, Flex, Select, FormControl, CheckIcon, WarningOutlineIcon, Circle, Button, ScrollView, AddIcon, TextArea } from "native-base";

const CreateRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");

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
                                    <Select maxWidth="100%" mb="4" accessibilityLabel="Rezeptliste wählen" placeholder="Rezeptliste wählen" _selectedItem={{
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
                        <Text mt="12" fontSize="md">Zutaten</Text>
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
                            <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                            </Circle>
                        </Flex>

                        {/* Zubereitung */}
                        <Text mt="12" fontSize="md">Zubereitungsschritte</Text>
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
                            <Circle size="40px" bg="lightgrey"><AddIcon color="darkText" />
                            </Circle>
                        </Flex>
                        <Button mt="12">Speichern</Button>
                    </Flex>
                </Flex>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;