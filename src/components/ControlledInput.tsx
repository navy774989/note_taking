import {useController} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native';
import React from 'react';
interface ControlledInputProps extends TextInputProps {
  name: string;
}
const ControlledInput = ({name, ...props}: ControlledInputProps) => {
  const {
    field: {value, onBlur, onChange},
    fieldState: {error},
  } = useController({
    name: name,
    rules: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
  });
  return (
    <TextInput
      {...props}
      onChangeText={onChange}
      value={value}
      onBlur={onBlur}
      placeholderTextColor={error?.message ? 'red' : 'grey'}
      textAlignVertical="top"
    />
  );
};
export default ControlledInput;
