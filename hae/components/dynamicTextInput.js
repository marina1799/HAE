import React, { useState } from "react";
import { View, TextInput, Button, index } from "react-native";

const DynamicTextInput = () => {
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
        <View>
            <View>
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
            </View>
            <Button title="add" onPress={handleAdd} />
        </View>
    );
};

export default DynamicTextInput;
