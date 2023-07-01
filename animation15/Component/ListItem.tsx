import { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { IItem } from "./interface";
import Animated, { FadeIn, FadeOut, Layout, ZoomIn } from "react-native-reanimated";



export const LIST_ITEM_COLOR = '#1798DE';

interface IProps extends IItem{
    deleteItem: (id: number)=>void
} 



export const ListItem: FC<IProps> = ({id, deleteItem})=>{
    return <Animated.View onTouchEnd={()=>deleteItem(id)} layout={Layout.delay(100)} exiting={FadeOut} entering={FadeIn.delay(100*id)} style={styles.item}>
        <Text style={styles.text}>{id}</Text>
    </Animated.View>
}


export const styles = StyleSheet.create({
    item: {
        height: 100,
        width: '90%',
        backgroundColor: LIST_ITEM_COLOR,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: "center",
        elevation: 8,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 10
        }
    },
    text: {
        fontSize: 45,
        fontWeight: "700",
        color: 'rgba(256, 256, 256, 0.5)'
    }
})