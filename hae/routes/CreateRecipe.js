import React, { useState } from "react";
import { NativeBaseProvider, Text, Input, Flex, Select, FormControl, CheckIcon, WarningOutlineIcon, Circle, Button } from "native-base";

const CreateRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");

    return (
        <NativeBaseProvider>
            <Flex p="3">
                <Input
                    placeholder="Rezepttitel"
                    variant="filled"
                    size="md"
                    width="250"
                    mx="auto"
                    mt="1"
                    mb="4"
                    onChangeText={(text) => setRecipeTitle(text)}
                    value={recipeTitle}
                />
                <Flex mt="2">
                    <Flex direction="row">
                        <Flex direction="column">
                            <Text mt="2">Rezeptliste:</Text>
                            <Text mt="2">Dauer:</Text>
                        </Flex>

                        <Flex direction="column">
                            <FormControl ml="2" w="3/4" maxW="300" isRequired isInvalid>
                                <Select maxWidth="100%" accessibilityLabel="Rezeptliste wählen" placeholder="Rezeptliste wählen" _selectedItem={{
                                    bg: "teal.600",
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
                                width="100%"
                                onChangeText={(text) => setRecipeTitle(text)}
                                value={recipeTitle}
                            />
                        </Flex>
                    </Flex>



                    {/* <Flex direction="row">
                        <Text direction="column" mt="2">Rezeptliste:</Text>
                        <FormControl direction="column" ml="2" w="3/4" maxW="300" isRequired isInvalid>
                            <Select maxWidth="100%" accessibilityLabel="Rezeptliste wählen" placeholder="Rezeptliste wählen" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />
                            }} mt="1">
                                <Select.Item label="Numero uno" value="1" />
                                <Select.Item label="Neue Rezeptliste erstellen" value="0" />
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Bitte eine Auswahl treffen.
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex direction="row">
                        <Text direction="column" mt="2">Dauer:</Text>
                        <Input
                            direction="column"
                            placeholder="Dauer eingeben"
                            variant="filled"
                            size="md"
                            ml="2"
                            width="85%"
                            onChangeText={(text) => setRecipeTitle(text)}
                            value={recipeTitle}
                        />
                    </Flex> */}
                    <Text mt="12">Zutaten</Text>
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
                        <Circle size="40px" bg="lightgrey">+
                        </Circle>
                    </Flex>

                    <Text mt="12">Zubereitungsschritte</Text>
                    <Flex direction="column" mt="2">
                        <Text mb="1">Schritt 1</Text>
                        <Flex direction="row">
                            <Button width="100" height="100" variant="outline">+</Button>
                            <Input
                                direction="column"
                                placeholder="Zutat"
                                variant="filled"
                                size="md"
                                ml="2"
                                width="69%"
                                onChangeText={(text) => setRecipeTitle(text)}
                                value={recipeTitle}
                            />
                        </Flex>
                    </Flex>
                    <Flex direction="row" mt="4" justifyContent="center">
                        <Circle size="40px" bg="lightgrey">+
                        </Circle>
                    </Flex>
                    <Button mt="4">Speichern</Button>
                </Flex>
            </Flex>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;