import { TextInput, StyleSheet } from "react-native"

const Input = (props: any) =>{
    return (
        <TextInput
            placeholder={props.placeholder || "Text here"}
            style={[props.style, styles.input]}
            onChangeText={props.onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    input: {
      width: 130,
      fontSize: 20,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderColor: '#b0b0b0'
    }
}) 

export default Input