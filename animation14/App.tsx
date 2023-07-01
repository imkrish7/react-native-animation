import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Tick } from './Component/Tick';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';


const NS = 12;


export default function App() {

  const progress = useSharedValue(0);

  useEffect(()=>{
    progress.value = withRepeat(withTiming((4*Math.PI), { duration: 8000, easing: Easing.linear }), -1)
  },[])

  return (
    <View style={styles.container}>
      {
        new Array(NS).fill(0).map((_: number, index: number)=>{
          return <Tick progress={progress} key={index} index={index} />
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
