import { FC, ReactElement } from "react";
import { ViewStyle, StyleProp, View } from "react-native";
import { TapGestureHandler, TapGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface IProps {
    onTap?: ()=> void,
    style?: StyleProp<ViewStyle>,
    children: ReactElement
}

type TContext = {

}

export const Ripple: FC<IProps> = ({onTap, style, children})=>{

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0);

    const aniamtedRef = useAnimatedRef<View>();

    const width = useSharedValue(0);
    const height = useSharedValue(0);
    const opacity = useSharedValue(1);

    const handleGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent, TContext>({
        onStart: (event)=>{
            const layout = measure(aniamtedRef);
            width.value = layout?.width || 0;
            height.value = layout?.height || 0;
            translateX.value = event.x;
            translateY.value = event.y;
            opacity.value = 1;
            scale.value = 0;
            scale.value = withTiming(1, {duration: 1000})
            
        },
        onActive: ()=>{
           
            if(onTap){
                runOnJS(onTap)();
            }
        },
        onFinish: ()=>{
            opacity.value = withTiming(0, { duration: 500});
        }
    })

    const rStyle = useAnimatedStyle(()=>{
       
        const circleRadius = Math.sqrt(width.value ** 2 + height.value **2);
        
        const centerX = translateX.value - circleRadius;
        const centerY = translateY.value - circleRadius;
        // console.log(centerX, centerY);
        return {
            width: 2* circleRadius,
            height: 2* circleRadius,
            opacity: opacity.value,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: circleRadius,
            transform: [{translateX: centerX}, {translateY: centerY},{
                scale: scale.value
            }, ]
        }
    })
    return <View ref={aniamtedRef} style={style}>
    <TapGestureHandler onGestureEvent={handleGestureEvent}>
            <Animated.View style={style}>
            <View>
                {children}
            </View>
            <Animated.View style={rStyle} />
            </Animated.View>
    </TapGestureHandler>   
    </View> 
}