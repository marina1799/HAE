import { extendTheme } from 'native-base';
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#68BB41',
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: '#F1D050',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

const FabStyles = StyleSheet.create({
  primaryFab: {
    backgroundColor: '#68BB41',

  },
  secondaryFab: {
    backgroundColor: '#F1D050',
  },
});

export { buttonStyles, FabStyles };
