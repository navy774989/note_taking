import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CircleSelectIcon} from './CircleSelectIcon';
import {useController} from 'react-hook-form';
import {useDisclosure} from '../hooks/useDisclosure';
import Entypo from 'react-native-vector-icons/Entypo';
interface ControlledSelectProps {
  options: {
    value: string;
  }[];
  name: string;
}
const ControlledSelect = ({options, name}: ControlledSelectProps) => {
  const {bottom} = useSafeAreaInsets();
  const {onOpen, isOpen, onClose} = useDisclosure();
  const {
    field: {value, onChange, onBlur},
    fieldState: {error},
  } = useController({
    name,
    rules: {
      required: {
        value: true,
        message: 'This field is required',
      },
    },
  });

  const color = React.useMemo(() => {
    return error?.message ? 'red' : value ? 'black' : 'grey';
  }, [error?.message, value]);

  return (
    <>
      <Pressable style={styles.buttonContainer} onPress={onOpen}>
        <Text style={[{color: color}]}>{value ?? 'Select a client'}</Text>
        <Entypo name="chevron-right" size={24} color={color} />
      </Pressable>
      <Modal
        onModalHide={onBlur}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        style={styles.modal}
        isVisible={isOpen}>
        <View style={styles.whiteBackground}>
          {options.map(item => {
            return (
              <Pressable
                style={styles.itemContainer}
                key={item.value}
                onPress={() => {
                  onChange(item.value);
                  onClose();
                }}>
                <CircleSelectIcon isSelected={value === item.value} />
                <Text>{item.value}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={[{height: bottom}, styles.whiteBackground]} />
      </Modal>
    </>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  circleIconContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'green',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 40,
    flexDirection: 'row',
  },
});
export default ControlledSelect;
