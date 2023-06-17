import * as FileSystem from 'expo-file-system';
import React from 'react';
import { View, Text } from 'react-native';

export const uploadImage = async (imageUri, fileName) => {
  const fileUri = FileSystem.documentDirectory + fileName;

  await FileSystem.copyAsync({
    from: imageUri,
    to: fileUri,
  });

  return fileUri;
};

export const deleteImage = async (fileUri) => {
  await FileSystem.deleteAsync(fileUri);
};
const FileSystemScreen = () => {
  return (
    <View>
      <Text>FileSystem Screen</Text>
    </View>
  );
};

export default FileSystemScreen;
