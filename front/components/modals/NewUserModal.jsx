import { ScrollView, Text, StyleSheet, View } from "react-native";
import { ModalTextInput, ModalImagePicker, ModalDatePicker } from "./Inputs";
import Button from "../Button";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import Modal from "./Modal";
import axios from "../../utils";


const NewUserModal = (props) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    birth_date: new Date(),
    image: null,
    email: '',
    password: '',
    biography: ''
  })

  const [pwdValidation, setPwdValidation] = useState('')
  const editable = props.mode !== 'view'
  const handleSubmit = async () => {
    await axios().post(
      modes[props.mode].url,
      form
    )
    .then(res => {})
    .catch(err => {
      console.log(err.response?.data)
    })
  }
  return (
    <Modal
      mode='view'
      title='Cadastro'
      onCancel={props.onCancel}
    >
      <ScrollView
        style={{...styles.viewContainer}}
      >
        <ModalImagePicker
          style={styles.imagePicker}
          editable={editable}
          size={150}
          image={form.image}
          keepRound
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
          <ModalDatePicker
            labelStyle={styles.input}
            editable={editable}
            title='Data de aniversário'
            value={form.birth_date}
            onChange={(e, v) => {
              setForm({...form, birth_date: v || form.birth_date})
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
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Email'
            value={String(form.email)}
            onChangeText={(v) => {
              setForm({...form, email: v})
            }}
          />
          <ModalTextInput
            secureTextEntry={true}
            labelStyle={styles.input}
            editable={editable}
            title='Senha'
            value={String(form.password)}
            onChangeText={(v) => {
              setForm({...form, password: v})
            }}
          />
          <ModalTextInput
            secureTextEntry={true}
            labelStyle={styles.input}
            editable={editable}
            title='Repita a senha'
            value={pwdValidation}
            onChangeText={(v) => {
              setPwdValidation(v)
            }}
          />
          <Button
            style={styles.button}
            onPress={()=>{
              axios().post('/user/new', form)
              .then(res => {
                props.onSubmit()
              })
              .catch(err => {
                console.log(err.response?.data)
              })
            }}
          >
            <Text
              style={styles.text}
            >
              Concluir Cadastro
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 0,
    paddingBottom: 16
  },
  multiLine:{
    height: 80,
  },
  inputsContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F6A80E',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16
  },
  input: {
    marginTop: 16,
  },
  imagePicker: {
    margin: 8,
  },
  button: {
    alignSelf: 'center',
    marginTop: 16,
    width: '100%',
    backgroundColor: '#F6A80E'
  },
  text: {
    fontWeight: 'bold'
  }
}) 

export default NewUserModal