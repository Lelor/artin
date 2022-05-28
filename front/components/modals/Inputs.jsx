import { useState } from "react";
import Input from "../TextInput"
import { StyleSheet, Text, Image } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '@react-native-community/datetimepicker'
import Button from "../Button";
import { formatDate } from "../../utils"
import Icon from 'react-native-vector-icons/FontAwesome5';


const _inputWrapper = (props) => (
  <>
      <Text
      style={styles.inputTitle}
      >
      {props.title || 'Title here'}
      </Text>
      {props.children}
  </>
)

export const ModalTextInput = (props) => (
  <_inputWrapper
    title={props.title}
  >
    <Input
      {...props}
      contextMenuHidden={props.editable}
      style={props.multiline? {...styles.input, ...styles.multilineInput}: styles.input}
    />
  </_inputWrapper>
)

export const ModalDropdown = (props) => {
  return(
    <_inputWrapper
      title={props.title}
    >
      <RNPickerSelect
        disabled={!props.editable}
        {...props}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      >
        {props.children}
      </RNPickerSelect>
    </_inputWrapper>
  )
};

export const ModalDatePicker = (props) => {
  const [show, setShow] = useState(false);

  return (
    <_inputWrapper
      title={props.title}
    >
      <Button
        activeOpacity={!props.editable? 1: null}
        style={styles.input}
        onPress={props.editable? ()=>{
          setShow(true)
        } : null}
      >
        <Text
          style={{textAlign: 'left'}}
        >
          {formatDate(props.value)}
        </Text>
      </Button>
      {
        show && 
        <DatePicker
          themeVariant="light"
          value={props.value}
          onChange={(e, d)=>{
            setShow(false)
            props.onChange && props.onChange(e, d)
          }}
        />
      }
    </_inputWrapper>
  )
}

export const ModalImagePicker = props => {
  const additionalStyles = {width: props.size, height: props.size, borderRadius: props.size/2}
  const [buttonStyle, setButtonStyle] = useState(props.image? styles.imagePickerSelected: {...styles.imagePickerUnselected, ...additionalStyles})
  const content = props.image ?
  (
  <Image
    source={{
        uri: `data:image/jpg;base64,${props.image}`
      }}
    // source={require('../../assets/gnu-logo.png')}
    resizeMode="cover"
    style={styles.imagePickerSelected}
  />
  ) 
  :
  (
    <Icon
      style={{fontSize: props.size/2, ...styles.imagePickerIcon}}
      name='image'
    />
  )

  return (
    <Button
      activeOpacity={props.editable? 0.2: 1}
      style={buttonStyle}
      onPress={props.editable ? ()=>{
        props.onPress()
        setButtonStyle(styles.imagePickerSelected)
      } : null}
    >
      {content}
    </Button>
  )
}

const styles = StyleSheet.create({
  inputTitle: {
    paddingTop: 16,
    padding: 8
  },
  input: {
    fontSize: 16,
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    textAlign: 'left',
    borderRadius: 3,
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    color: 'black'
  },
  multilineInput: {
    height: 100
  },
  imagePickerUnselected: {
    alignSelf: 'center',
    margin: 8,
    marginTop: 16,
    backgroundColor: '#cfcfcf'
  },
  imagePickerSelected:{
    width: '100%',
    borderRadius: 0,
    height: 210,
    backgroundColor: 'white'
  },
  imagePickerIcon: {
    color: '#4d4d4d'
  }
})


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...styles.input
  },
})
