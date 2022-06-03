import { ScrollView, Text, StyleSheet, View } from "react-native";
import { ModalTextInput, ModalImagePicker, ModalitiesInput } from "./Inputs";
import { ModalFooter, ModalHeader } from "./ModalUtils";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../utils";
import Modal from "./Modal";


const validate = (form) => (
  form.name
  && form.description
  && form.address
  && form.modalities
  && form.image
)


const AddPlaceModal = (props) => {
  const modes = {
    update: {url: `/place/${props.data?.id}/update`, title: 'Editar'},
    create: {url: '/place/new', title: 'Criar'},
    view: {url: '', title: ''}
  }
  const [form, setForm] = useState({
    name: props.data?.name || '',
    description: props.data?.description || '',
    address: props.data?.address || '',
    modalities: props.data?.modalities || [],
    image: props.data?.image || null,
  })
  const editable = props.mode !== 'view'
  return (
    <Modal
      mode={props.mode}
      title='Centro'
      onCancel={props.onCancel}
      onSubmit={async ()=>{
        if(validate(form)){
          await axios().post(
              modes[props.mode].url,
              form
          )
          .then(res => {})
          .catch(err => {
            console.log(err.response.data)
          })
          props.onSubmit()
        }
      }}
    >
      <ScrollView
        style={{...styles.viewContainer, marginTop: editable? 16: 0}}
      >
        <ModalImagePicker
          style={styles.imagePicker}
          editable={editable}
          size={150}
          image={form.image}
          onPress={async ()=>{
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 1,
              base64: true
            });
            setForm({...form, image: result.base64 || form.image})
        }}
        />
        <View
          style={styles.inputsContainer}
        >
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Nome'
            value={String(form.name)}
            onChangeText={(v) => {
              setForm({...form, name: v})
            }}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Descrição'
            style={styles.multiLine}
            multiline={true}
            value={String(form.description)}
            onChangeText={(v) => {
              setForm({...form, description: v})
            }}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Localização'
            value={String(form.address)}
            onChangeText={(v) => {
              setForm({...form, address: v})
            }}
          />
          <ModalitiesInput
            labelStyle={styles.input}
            title='Modalidades'
            editable={editable}
            value={form.modalities}
            onChange={(v)=>{
              setForm({...form, modalities: v})
            }}
          />
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  multiLine:{
    height: 80,
  },
  inputsContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  input: {
    marginTop: 16,
  },
  imagePicker: {
    margin: 32
  }
}) 

export default AddPlaceModal