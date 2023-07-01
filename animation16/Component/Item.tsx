import { FC, memo } from "react"
import { StyleSheet, View, ViewToken } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";


interface IProps {
    item: {id: number}
   viewableItems: Animated.SharedValue<ViewToken[]> 
}



export const Item: FC<IProps> = memo(({viewableItems, item})=>{
    const rStyle = useAnimatedStyle(()=>{
        const isVisible =Boolean(viewableItems.value
                            .filter((item)=> item.isViewable)
                            .find((viewableItem)=> viewableItem.item.id == item.id));

        return {
            opacity: withTiming(isVisible ? 1: 0),
            transform:[{
                scale: withTiming(isVisible ? 1: 0)
            }]
        }
    })
    return <Animated.View style={[styles.item, rStyle]}  />;
})

const styles = StyleSheet.create({
    item: {
        height: 80,
        width: '90%',
        backgroundColor: 'rgba(0, 0,0, 0.2)',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center'
  }
})