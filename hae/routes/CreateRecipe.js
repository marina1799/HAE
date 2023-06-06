import React, { useState } from "react";
import { NativeBaseProvider, Text, Input, Flex, Select, Center, FormControl, CheckIcon, WarningOutlineIcon } from "native-base";

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
                <Text>Rezeptliste:</Text>
                <Center>
                    <FormControl w="3/4" maxW="300" isRequired isInvalid>
                        <FormControl.Label>Choose service</FormControl.Label>
                        <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />
                        }} mt="1">
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please make a selection!
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Center>
            </Flex>
        </NativeBaseProvider>
    );
};

export default CreateRecipe;