import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SlidingCounter } from './Component/SlidingCounter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (<GestureHandlerRootView style={styles.container} >
            <StatusBar style="auto" />
            <SlidingCounter />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
