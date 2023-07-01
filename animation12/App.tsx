import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useCallback } from 'react';

type TContext = {
  x: number
}


const { width, height } = Dimensions.get("window");

const THRESHOLD = width/3;

export default function App() {

  const translateX = useSharedValue(0);
  const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, TContext>({
    onStart: (_, context)=>{
      context.x = translateX.value;
    },
    onActive: (event, context)=>{
      console.log("tal")
      translateX.value = event.translationX + context.x;
    },
    onEnd: ()=>{
      if(translateX.value <= THRESHOLD){
      translateX.value = withTiming(0);
      }else{
        translateX.value = withTiming(width/2)
      }
    }
    
  })

  const rStyle = useAnimatedStyle(()=>{
    const rotate = interpolate(translateX.value,[0, width/2], [0,2.5], Extrapolate.CLAMP);
    const borderRadius = interpolate(translateX.value,[0, width/2], [0,15], Extrapolate.CLAMP);
    
    return {
      borderRadius,
      transform: [
        {translateX: translateX.value}, 
        {perspective: 100},
        {rotateY: `-${rotate}deg`}
      ]
    }
  })

  const handlePress = useCallback(()=>{
    if(translateX.value > 0){
      translateX.value = withTiming(0);
    }
  },[]);


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="inverted" />
        <PanGestureHandler onGestureEvent={gestureEventHandler}>
        <Animated.View style={[styles.tilt, rStyle]}>
          <Entypo name="menu" size={32} color="black" onPress={handlePress} />
        </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e23',
    paddingTop: Platform.OS === 'android' ? 20: 0,
  },
  tilt: {
    backgroundColor: "white",
    flex: 1,
  }
});
