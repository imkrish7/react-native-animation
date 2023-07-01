import { AntDesign } from "@expo/vector-icons"
import { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { runOnJS, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";


const ICON_SIZE = 20;
const CIRCLERADIUS = 50;
const BUTTON_WIDTH = 170;
const BUTTON_HEIGHT= 70;
const SLIDE_OFFSET = BUTTON_WIDTH * 0.3;


type TContext = {

}

const clamp = (value: number, min: number, max: number)=>{
    'worklet';
    return Math.min(max, Math.max(value, min))
}

export const SlidingCounter = ()=>{

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const [count, setCount] = useState(0);

    const increment = useCallback(()=>{
        // external library function
         setCount(_count => _count+1)
    },[])
    
    const decrement = useCallback(()=>{
        // external library function
         setCount(_count=> _count-1)
    },[])

     const reset = useCallback(()=>{
        // external library function
         setCount(0);
    },[])



    const handleGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, TContext>({
        onActive: (event)=>{
            translateX.value = clamp(event.translationX, -SLIDE_OFFSET, SLIDE_OFFSET); 
            translateY.value = clamp(event.translationY, -SLIDE_OFFSET,SLIDE_OFFSET);
        },
        onEnd: ()=>{
            if(translateX.value === SLIDE_OFFSET){
                runOnJS(increment)();
            }else if (translateX.value === -SLIDE_OFFSET){
                runOnJS(decrement)();
            }else if(translateY.value === SLIDE_OFFSET){
                runOnJS(reset)();
            }
            
            translateX.value = withSpring(0, {stiffness: 200});
            translateY.value = withSpring(0, {stiffness: 200});
        }
    })

    const rStyle = useAnimatedStyle(()=>{
        return {
            transform: [{translateX: translateX.value}, { translateY: translateY.value }]
        }
    })

    const rIconStyle = useAnimatedStyle(()=>{
        const opacityX = interpolate(translateX.value, [-SLIDE_OFFSET, 0, SLIDE_OFFSET], [0.4,0.8,0.4])
        const opacityY = interpolate(translateY.value, [0, SLIDE_OFFSET], [ 1,0])
        
        return {
            opacity:opacityX * opacityY
        }
    })

    const rCloseIcon = useAnimatedStyle(()=>{
         const opacity = interpolate(translateY.value, [-SLIDE_OFFSET, 0, SLIDE_OFFSET], [0.4,0.8,0.4])
        return {
            opacity
        }
    })

    const rButtonStyle = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateX: translateX.value * 0.1},
                {translateY: translateY.value * 0.2}
            ]
        }
    })

    return <Animated.View style={[styles.box, rButtonStyle]}>
        <Animated.View style={rIconStyle}>
            <AntDesign name="minus" color="white" size={ICON_SIZE} />
        </Animated.View>
        <Animated.View style={rCloseIcon}>
            <AntDesign name="close" color="white" size={ICON_SIZE} />
        </Animated.View>
        <Animated.View style={rIconStyle}>
            <AntDesign name="plus" color="white" size={ICON_SIZE} />
        </Animated.View>
        <View style={{...StyleSheet.absoluteFillObject , justifyContent: "center", alignItems: "center"}}>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <Animated.View style={[styles.circle, rStyle]}>
                    <Text style={styles.count}>{count}</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    </Animated.View>
}


const styles  = StyleSheet.create({
     box: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        backgroundColor: 'black',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    circle: {
        width: CIRCLERADIUS,
        height: CIRCLERADIUS,
        borderRadius: CIRCLERADIUS/2,
        backgroundColor: "#232323",
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center"
    },
    count: {
        fontSize: 20,
        fontWeight: "500",
        color: 'rgba(256,256, 256,0.7)'
    }
})

