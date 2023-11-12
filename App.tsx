import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Notes from './src/pages/Notes';
import NoteDetail from './src/pages/NoteDetail';
export type RootStackParamList = {
  Notes: undefined;
  NoteDetail: {
    index?: number;
    category?: string;
    client?: string;
    content?: string;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen
            name="NoteDetail"
            options={({route: {params}}) => {
              return {
                headerTitle:
                  params.index === undefined ? 'New Note' : 'Edit Note',
              };
            }}
            component={NoteDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
