import Button from "../Button";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { ModalTextInput, ModalDropdown, ModalDatePicker, ModalImagePicker } from "./Inputs";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../utils";


const validate = (form) => (
  form.type && form.description && form.address && form.max_capacity && form.start_date
)


const AddPostModal = (props) => {
  const modes = {
    update: {url: `/activity/${props.data?.id}/update`, title: 'Editar'},
    create: {url: '/activity/new', title: 'Criar'},
    view: {url: '', title: ''}
  }
  const [form, setForm] = useState({
    type: props.data?.type || null,
    description: props.data?.description || null,
    address: props.data?.address || null,
    max_capacity: props.data?.max_capacity || '',
    start_date: props.data?.start_date? new Date(Date.parse(props.data?.start_date)) : new Date(),
    image: props.data?.image || null
  })
  const editable = props.mode !== 'view'
  return (
    <ScrollView
      style={styles.viewContainer}
    >
      <ModalImagePicker
        editable={editable}
        size={100}
        image={form.image}
        onPress={async ()=>{
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
            base64: true
          });
          setForm({...form, image: result.base64})
      }}
      />
      <ModalDropdown
        editable={editable}
        placeholder={{label: 'Selecione', value: null}}
        title='Tipo do evento'
        value={form.type}
        items={[
          { label: 'Opção 1', value: 'op1' },
          { label: 'Opção 2', value: 'op2' },
          { label: 'Opção 3', value: 'op3' },
      ]}
        onValueChange={v=>{setForm({...form, type: v})}}
      />
      <ModalTextInput
        editable={editable}
        title='Descrição'
        value={form.description}
        multiline={true}
        onChangeText={(v)=>{setForm({...form, description: v})}}
      />
      <ModalTextInput
        editable={editable}
        title='Capacidade máxima'
        keyboardType='numeric'
        value={String(form.max_capacity)}
        onChangeText={(v) => {
          setForm({...form, max_capacity: v.replace(/[^0-9]/g, '')})
        }}
      />
      <ModalTextInput
        editable={editable}
        title='Endereço'
        value={form.address}
        onChangeText={(v) => {setForm({...form, address: v})}}
      />
      <ModalDatePicker
        editable={editable}
        title='Data do evento'
        value={form.start_date}
        onChange={(e, v) => {
          setForm({...form, start_date: v || form.start_date})
        }}
      />
      <View
        style={{...styles.viewContainer, ...styles.buttonView}}
      >
        <Button
          onPress={props.onCancel}
          style={styles.button}
        >
          <Text>Cancelar</Text>
        </Button>
        {editable && (
        <Button
          onPress={async ()=>{
            if(validate(form)){
              await axios().post(
                  modes[props.mode].url,
                  form
              )
              .then(res => {})
              .catch(err => {
                console.log(err.message)
              })
              props.onSubmit()
            }
          }}
          style={styles.button}
        >
          <Text>{modes[props.mode].title}</Text>
        </Button>)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  button: {
    // margin: 16,
  },
  buttonView: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-around"
  }
}) 

export default AddPostModal