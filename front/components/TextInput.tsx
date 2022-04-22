import { useState } from 'react'
import { TextInput, StyleSheet } from "react-native"

const Input = (props: any) =>{
    const isError = props.error === true
    const isDisabled = props.disabled === true
    const additionalStyles = [
        isError && styles.error,
        isDisabled && styles.disabled
    ]

    return (
        <TextInput
            // underlineColorAndroid='transparent'
            placeholder={props.placeholder || "Text here"}
            style={[props.style, styles.input, ...additionalStyles]}
            secureTextEntry={props.secureTextEntry || false}
            onChangeText={props.onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    input: {
      fontSize: 20,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderColor: '#b0b0b0',
      alignSelf: 'center'
    },
    error: {
        borderColor: 'red'
    },
    disabled: {
        backgroundColor: '#b0b0b0'
    }
}) 

export default Input