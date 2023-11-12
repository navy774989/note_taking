import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMMKVObject} from 'react-native-mmkv';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Notes = () => {
  const {bottom} = useSafeAreaInsets();
  const [notes, setNote] = useMMKVObject<
    {
      client: string;
      content: string;
      category: string;
    }[]
  >('data.notes');
  const {navigate} =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'NoteDetail'>
    >();
  const onDelete = (index: number) => {
    Alert.alert('Delete', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setNote(
            notes?.filter((item, i) => {
              return i !== index;
            }),
          );
        },
      },
    ]);
  };
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: bottom,
        },
      ]}>
      <FlatList
        contentContainerStyle={styles.listcontainer}
        ListEmptyComponent={ListEmpty}
        data={notes ?? []}
        renderItem={({item, index}) => {
          return (
            <ListItem
              onDelete={() => onDelete(index)}
              item={item}
              onPress={() => {
                navigate('NoteDetail', {
                  index,
                  category: item.category,
                  client: item.client,
                  content: item.content,
                });
              }}
            />
          );
        }}
      />
      <Pressable
        onPress={() => {
          navigate('NoteDetail', {});
        }}
        style={styles.addIconContainer}>
        <Ionicons style={styles.addIcon} name="add" size={50} color="white" />
      </Pressable>
    </View>
  );
};
interface ListItemProps {
  onPress: () => void;
  item: {
    client: string;
    content: string;
    category: string;
  };
  onDelete: () => void;
}
const ListItem = ({onPress, item, onDelete}: ListItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <View style={{flex: 8}}>
        <Text numberOfLines={2}>{item.content}</Text>
        <Text style={styles.redText}>client:{item.client}</Text>
        <Text style={styles.redText}>category:{item.category}</Text>
      </View>
      <Pressable onPress={onDelete} style={{flex: 1}}>
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
    </Pressable>
  );
};
const ListEmpty = () => {
  return (
    <View style={styles.listEmptyContainer}>
      <Ionicons name="file-tray" size={100} color="black" />
      <Text>No Data!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    width: 70,
    height: 70,
  },
  addIcon: {},
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listcontainer: {
    flexGrow: 1,
  },
  redText: {
    color: 'red',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Notes;
