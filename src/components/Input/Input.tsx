import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface InputProps {
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontSize: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#696969',
    padding: 10,
    marginBottom: 20,
    paddingLeft: 0,
    paddingBottom: 5,
  },
});

const Input: React.FC<InputProps> = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor="#696969"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;
