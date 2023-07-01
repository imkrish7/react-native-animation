import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from './Component/ListItem';
import { IItem } from './Component/interface';
import { useCallback, useState } from 'react';



const Items: IItem[] = new Array(4).fill(0).map((_, index)=>({id:index}));

export default function App() {

  const [items, setItem] = useState<IItem[]>(Items);

  const addItem = useCallback(()=>{
    
    setItem((_items: IItem[])=> {
      const nextId =  (_items[_items.length - 1]?.id ?? 0 ) + 1;
      return [..._items, {id: nextId}]
    });
  }, [])

  const deleteItem = useCallback((id: number)=>{
      setItem((_itemes: IItem[]) => _itemes.filter((_item: IItem)=> _item.id != id))
  },[])

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 40}}>
        {
          items.map((item, index)=>{
            return <ListItem  {...{...item, deleteItem}} key={index}/>
          })
        }
      </ScrollView>
      <TouchableOpacity onPress={addItem} style={styles.floatingButton} >
        <Text style={{ fontSize: 50, color: 'white', fontWeight: '600'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white'
  },
  floatingButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    bottom: 10,
    right: '5%',
    backgroundColor: 'grey',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
