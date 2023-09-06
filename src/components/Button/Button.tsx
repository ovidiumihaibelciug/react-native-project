import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface GlobalButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({
  title = '',
  onPress,
  style = {},
}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: '#242424',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 15,
    color: '#E2E2E2',
  },
});

export default GlobalButton;
