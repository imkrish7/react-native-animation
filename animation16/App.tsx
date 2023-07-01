import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { Item } from './Component/Item';
import { useSharedValue } from 'react-native-reanimated';

interface IItem {
  id: number
}


const data: IItem[] = new Array(50).fill(0).map((_: number, index: number)=> ({id: index}));


export default function App() {

  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList onViewableItemsChanged={({viewableItems:items})=>{
        viewableItems.value = items;
      }} contentContainerStyle={{paddingTop: 40}} data={data} renderItem={({item})=>{
        return <Item item={item} viewableItems={viewableItems} />
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  
});
