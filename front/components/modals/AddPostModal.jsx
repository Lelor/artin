import { useEffect } from "react";
import Toast from 'react-native-toast-message';
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { ModalTextInput, ModalDropdown, ModalDatePicker, ModalImagePicker } from "./Inputs";
import { useState } from "react";
import Modal from './Modal'
import * as ImagePicker from 'expo-image-picker';
import axios from "../../utils";


const validate = (form) => (
  form.type
  && form.description
  && form.address
  && form.max_capacity
  && form.start_date
  && form.title
)


const AddPostModal = (props) => {
  const [places, setPlaces] = useState([])
  useEffect(async ()=>{
    await axios().get(
        '/place/list'
    )
    .then(res => setPlaces(res.data.places))
    .catch(err => {
      console.log(err.response?.data)
    })
  }, [])
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
    image: props.data?.image || null,
    title: props.data?.title || '',
    place: props.data?.place || null,
    level: props.data?.level || 'iniciante',
    cost: props.data?.cost || '',
    interval: props.data?.interval || ''
  })
  const editable = props.mode !== 'view'
  return (
    <Modal
      mode={props.mode}
      title='Atividade'
      onDelete={props.onDelete}
      onCancel={props.onCancel}
      onSubmit={async ()=>{
        if(validate(form)){
          await axios().post(
              modes[props.mode].url,
              form
          )
          .then(res => {
            props.onSubmit()
          })
          .catch(err => {
            Toast.show({
              type: 'error',
              text1: 'Erro no servidor',
              text2: 'A criação da atividade não foi concluída!',
            });
          })
        }
      }}
    >
      <ScrollView
        style={{...styles.viewContainer, marginTop: editable? 16: 0}}
      >
        <ModalImagePicker
          editable={editable}
          size={150}
          image={form.image}
          style={styles.imagePicker}
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
            value={form.title}
            onChangeText={(v) => {
              setForm({...form, title: v})
            }}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Descrição'
            value={form.description}
            multiline={true}
            onChangeText={(v)=>{
              setForm({...form, description: v})
            }}
          />
          <ModalDropdown
            labelStyle={styles.input}
            editable={editable}
            placeholder={{label: 'Selecione o centro.', value: null}}
            title='Centro'
            value={form.place}
            items={places.map(c => ({label: c.name, value: c.id}))}
            onValueChange={v=>{
              const placeAddr = places.find(p=>p.id===v)?.address || form.address
              setForm({...form, place: v, address: placeAddr})
            }}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Localização'
            value={form.address}
            onChangeText={(v) => {setForm({...form, address: v})}}
          />
          <ModalDropdown
            labelStyle={styles.input}
            editable={editable}
            placeholder={{label: 'Selecione', value: null}}
            title='Modalidade'
            value={form.type}
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
            onValueChange={v=>{setForm({...form, type: v})}}
          />
          <ModalDropdown
            labelStyle={styles.input}
            editable={editable}
            placeholder={{label: 'Selecione', value: null}}
            title='Nível'
            value={form.level}
            items={[
              { label: 'Iniciante', value: 'iniciante' },
              { label: 'Intermediário', value: 'intermediario' },
              { label: 'Avançado', value: 'avancado' },
          ]}
            onValueChange={v=>{setForm({...form, level: v})}}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Capacidade'
            keyboardType='numeric'
            value={String(form.max_capacity)}
            onChangeText={(v) => {
              setForm({...form, max_capacity: v.replace(/[^0-9]/g, '')})
            }}
          />
          <ModalDatePicker
            labelStyle={styles.input}
            editable={editable}
            title='Data do evento'
            value={form.start_date}
            onChange={(e, v) => {
              setForm({...form, start_date: v || form.start_date})
            }}
          />
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Periodicidade'
            value={form.interval}
            onChangeText={(v) => {setForm({...form, interval: v})}}
          />
          <ModalTextInput
            labelStyle={{...styles.input}}
            editable={editable}
            title='Custo'
            value={form.cost}
            onChangeText={(v) => {setForm({...form, cost: v})}}
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
    backgroundColor: '#fff',
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

export default AddPostModal