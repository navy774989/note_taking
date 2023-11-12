import {View} from 'react-native';
import React from 'react';
import {styles} from './ControlledSelect';

interface CircleSelectIconProps {
  isSelected?: boolean;
}
export const CircleSelectIcon = ({isSelected}: CircleSelectIconProps) => {
  return (
    <View style={styles.circleIconContainer}>
      {isSelected && <View style={styles.circleActive} />}
    </View>
  );
};
