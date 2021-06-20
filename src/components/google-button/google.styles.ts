import { StyleSheet } from 'react-native';
import { Platform } from '@/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  button: {
    marginVertical: Platform.SizeScale(8),
  },
});

export default styles;
