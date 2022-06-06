import { useState } from "react";
import Input from "../TextInput"
import { StyleSheet, Text, Image, View } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '@react-native-community/datetimepicker'
import Button from "../Button";
import { formatDate } from "../../utils"
import Icon from 'react-native-vector-icons/FontAwesome5';


const _inputWrapper = (props) => {
  return (
    <>
        <Text
        style={{...styles.inputTitle, ...props.style}}
        >
        {props.title || 'Title here'}
        </Text>
        {props.children}
    </>
  ) 
}

export const ModalTextInput = (props) => (
  <_inputWrapper
    title={props.title}
    style={props.labelStyle}
  >
    <Input
      secureTextEntry={props.secureTextEntry}
      multiline={props.multiline}
      onChangeText={props.onChangeText}
      editable={props.editable}
      value={props.value}
      keyboardType={props.keyboardType}
      contextMenuHidden={props.editable}
      style={[props.multiline? {...styles.input, ...styles.multilineInput}: styles.input, props.style]}
    />
  </_inputWrapper>
)

export const ModalDropdown = (props) => {
  return(
    <_inputWrapper
      title={props.title}
      style={props.labelStyle}
    >
      <RNPickerSelect
        placeholder={{label: 'Selecione', value: null}}
        value={null}
        disabled={!props.editable}
        {...props}
        style={{...pickerSelectStyles, ...props.style}}
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
      style={props.labelStyle}
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
          {props.value? formatDate(props.value): null}
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
  const [buttonStyle, setButtonStyle] = useState(props.image? styles.imagePickerSelected: {...styles.imagePickerUnselected, ...additionalStyles, ...props.style})
  const content = props.image ?
  (
  <Image
    source={{
        uri: `data:image/jpg;base64,${props.image}`
      }}
    // source={require('../../assets/place.png')}
    resizeMode="cover"
    style={props.keepRound ? {...styles.imagePickerSelectedRound, ...additionalStyles} : styles.imagePickerSelected}
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
      style={{...buttonStyle}}
      onPress={props.editable ? ()=>{
        props.onPress()
        setButtonStyle(props.keepRound? {...props.style, ...styles.imagePickerSelectedRound, ...additionalStyles} : styles.imagePickerSelected)
      } : null}
    >
      {content}
    </Button>
  )
}


export const ModalitiesInput = props => {
  return (
    <_inputWrapper
    title={props.title}
    style={props.labelStyle}
    >
      {props.editable && <RNPickerSelect
        // disabled={!props.editable}
        items={[
          { label: 'Música', value: 'musica' },
          { label: 'Dança', value: 'danca' },
          { label: 'Escultura', value: 'escultura' },
          { label: 'Teatro', value: 'teatro' },
          { label: 'Literatura', value: 'literatura' },
          { label: 'Cinema', value: 'cinema' },
          { label: 'Fotografia', value: 'fotografia' },
          { label: 'História', value: 'historia' },
          { label: 'Jogos', value: 'jogos' },
          { label: 'Arte Digital', value: 'artedigital' }
        ]}
        style={modalityPicker}
        useNativeAndroidPickerStyle={false}
        onValueChange={(v)=>props.onChange([... new Set(props.value.concat(v))])}
      >
        <Button
          style={{margin: 8, marginLeft: 16, width: 110, borderRadius: 55, alignSelf: 'flex-start', borderWidth: 0, backgroundColor: '#F6A80E', flexDirection: 'row', justifyContent: 'space-around'}}
        >
          <Text
            style={{alignSelf:'center', color:'#fff', fontSize: 14, fontWeight: '900'}}
          >Adicionar</Text>
          <Icon
            style={{fontSize: 14, color: '#000'}}
            name='plus'
          />
        </Button>
      </RNPickerSelect>}
      <View
        style={styles.modalities}
      >
      {
        props.value.map(s => (
          <View
            key={props.value.indexOf(s)}
            style={styles.selectedModality}
          >
            <Text style={{paddingLeft: 2}}>{s}</Text>
            {props.editable && <Icon
              style={{fontSize: 12, position: 'absolute', alignSelf: 'flex-end', paddingRight: 4, color: 'red'}}
              name='times'
              onPress={()=> {
                props.onChange(props.value.filter(i => i !== s))
              }}
            />}
          </View>
        ))
      }
      </View>
    </_inputWrapper>
  )
}


const styles = StyleSheet.create({
  modalities: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    alignSelf: 'center',
    padding: 8,
    paddingLeft: 0
  },
  selectedModality: {
    margin: 1,
    marginLeft: 8,
    height: 20,
    width: 100,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: '#b4b4b4'
  },
  inputTitle: {
    color: '#A1A1A1',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    width: '100%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    textAlign: 'left',
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    color: 'black',
    alignItems: "flex-start"
  },
  multilineInput: {
    height: 100
  },
  imagePickerUnselected: {
    alignSelf: 'center',
    backgroundColor: '#F6A80E'
  },
  imagePickerSelected:{
    width: '100%',
    borderRadius: 0,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 210,
    backgroundColor: 'white',
  },
  imagePickerSelectedRound:{
    backgroundColor: '#F6A80E',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#F6A80E'
  },
  imagePickerIcon: {
    color: '#000'
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

const modalityPicker = StyleSheet.create({
  inputAndroid: {
    ...styles.input,
    borderBottomWidth: 0
  }
})
