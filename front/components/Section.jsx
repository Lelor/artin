import { StyleSheet, View, Text } from "react-native";


const Section = props => {
    return (
        <View style={styles.view}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View style={styles.children}>
                {props.children}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    view:{
        height: 60,
        backgroundColor: '#B87EDC',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8
        
    },
    title: {
        fontSize: 16,
    },
    children: {
        display: "flex",
        flexDirection: "row"
    }
})


export default Section