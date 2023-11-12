/* eslint-disable react/no-unstable-nested-components */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import ControlledSelect from '../../components/ControlledSelect';
import React from 'react';
import Clients from '../../json/clients.json';
import Categories from '../../json/categories.json';
import ControlledInput from '../../components/ControlledInput';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useMMKVObject} from 'react-native-mmkv';
type FormType = {
  client: string;
  category: string;
  content: string;
};
const NoteDetail = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<RootStackParamList, 'NoteDetail'>>();
  const {setOptions} = useNavigation();
  const [note, setNote] = useMMKVObject<
    {
      client: string;
      content: string;
      category: string;
    }[]
  >('data.notes');
  const methods = useForm<FormType>({
    mode: 'all',
    defaultValues: {
      category: params.category,
      client: params.client,
      content: params.content,
    },
  });
  const onSubmit = React.useCallback(
    (data: FormType) => {
      if (!params?.index && params.index !== 0) {
        setNote(note?.concat([data]) ?? [data]);
      } else {
        setNote(
          note?.map((item, index) => {
            if (index === params.index) {
              return data;
            }
            return item;
          }) ?? [data],
        );
      }
      goBack();
    },
    [note, params?.index],
  );
  React.useEffect(() => {
    if (methods.formState.isDirty) {
      setOptions({
        headerRight: () => (
          <HeaderRight onPress={methods.handleSubmit(onSubmit)} />
        ),
      });
    } else {
      setOptions({
        headerRight: undefined,
      });
    }
  }, [methods.formState.isDirty, setOptions, methods.handleSubmit, onSubmit]);
  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.row}>
          <ControlledSelect name="client" options={Clients} />
          <View style={styles.divider} />
          <ControlledSelect name="category" options={Categories} />
        </View>
        <ControlledInput
          placeholder="add your note"
          style={styles.input}
          multiline
          name="content"
        />
      </View>
    </FormProvider>
  );
};
const HeaderRight = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <Text>Save</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: 'grey',
  },
  input: {
    height: '100%',
    paddingHorizontal: 20,
  },
});
export default NoteDetail;
