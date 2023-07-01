import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from "react-native-reanimated";

const NS = 12;

interface IProps {
    index: number,
    progress: Animated.SharedValue<number>
}


export const Tick: FC<IProps> = ({index, progress})=>{
    const offsetAngle = (2*Math.PI)/NS;
    const finalAngle = offsetAngle *(NS - 1 - index);
    const rotate = useDerivedValue(()=>{
        if(progress.value <= (2 * Math.PI)){
            return Math.min(finalAngle, progress.value);
        }
        if((progress.value - 2*Math.PI) <= finalAngle ){
            return finalAngle;
        }
        return progress.value;
    }, [])

    const translateY = useDerivedValue(()=>{
        if(rotate.value === finalAngle){
            return withSpring(- NS * NS);
        }
        if(progress.value >= 2*Math.PI){
            return withTiming((NS-index)*NS)
        }
        return withTiming(-(index * NS))
    })
    
    const rStyle = useAnimatedStyle(()=>{
        
        return {
            transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value }
            ]
        }
    })
    return <Animated.View style={[styles.stick,rStyle]}/>
}


const styles = StyleSheet.create({
    stick: {
    height: NS,
    aspectRatio: 1,
    backgroundColor: "white",
    position: 'absolute'
  }
})