import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ripple } from './Component/Ripple';


const { width, height } = Dimensions.get("window");


export default function App() {
  const tapHandler = ()=>{
    console.log("Tap");
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Ripple onTap={tapHandler} style={styles.ripple}>
        <Text style={styles.text}>Tap</Text>
      </Ripple>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'smokywhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: height/4,
    height: height/4,
    borderRadius: 20,
    elevation: 6,
    shadowOpacity: 1,
    shadowColor: "grey",
    backgroundColor: "white",
    shadowOffset: {
      width: 10,
      height: 10
    },
    overflow: 'hidden',
    shadowRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontSize: 70,
    fontWeight: "600",
    color: "rgba(0,0,0,.3)"
  }
});
