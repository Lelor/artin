import { useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AddPostModal from "./AddPostModal";
import { Modal as NativeModal } from 'react-native'
import { ModalTextInput, ModalImagePicker, ModalitiesInput } from "./Inputs";
import Toast from 'react-native-toast-message';
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from "../../utils";
import Modal from "./Modal";
import Button from "../Button";
import Icon from 'react-native-vector-icons/FontAwesome5';


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
  const [activities, setActivities] = useState(null)
  const [currentActivity, setcurrentActivity] = useState(null)
  const [showActivity, setShowActivity] = useState(false)
  const editable = props.mode !== 'view'
  useEffect(()=>{
    if (!editable) {
      axios().get(`/place/${props.data.id}/activities`)
      .then(res => {
        setActivities(res.data.activities)
      })
      .catch(err => {})
    }
  }, [])
  return (
    <>
    <NativeModal
      visible={showActivity}
    >
      <AddPostModal
        data={currentActivity}
        mode='view'
        onCancel={()=>{
          setcurrentActivity(null)
          setShowActivity(false)
        }}
      />
    </NativeModal>
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
          {activities && (
            <>
            <Text
              style={{fontWeight: 'bold', marginTop: 16, marginBottom: 8}}
            >
              Atividades
            </Text>
            {activities.map(ac => (
              <Button
                style={styles.activityButton}
                key={ac.id}
                onPress={()=>{
                  setcurrentActivity(ac)
                  setShowActivity(true)
                }}
              >
                <Text
                  style={{color: '#fff', fontWeight: 'bold', width:'90%'}}
                  numberOfLines={1}
                >
                  {ac.title}
                </Text>
                <Icon
                  name='chevron-right'
                  size={20}
                  light
                />
              </Button>
            ))}
            </>
          )}
        </View>
      </ScrollView>
    </Modal>
    </>
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
  },
  activityButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#F6A80E',
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 0,
    marginBottom: 2,
    justifyContent: 'space-between',
    borderRadius: 12,
  }
}) 

export default AddPlaceModal