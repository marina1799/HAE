// ImageUpload.js
import * as React from 'react';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ImageUpload = ({ onImageSelected }) => {
  const [selectedImageUri, setSelectedImageUri] = React.useState('');

  const pickImage = async () => {
    // Code zum Bildauswählen
  };

  const uploadImage = async () => {
    // Code zum Hochladen des Bildes
    onImageSelected(selectedImageUri); // Aufruf der übergebenen Funktion mit dem ausgewählten Bild-URI
  };

  return (
    <>
      <Button title="Select Image" onPress={pickImage} />
      {selectedImageUri ? (
        <Button title="Upload Image" onPress={uploadImage} />
      ) : null}
    </>
  );
};

export default ImageUpload;
