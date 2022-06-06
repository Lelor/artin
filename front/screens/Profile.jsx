import { useState, useEffect } from "react";
import { Dimensions, ScrollView, Text, View, StyleSheet, StatusBar, KeyboardAvoidingView } from "react-native";
import Section from "../components/Section";
import Footer from "../components/Footer";
import { ModalImagePicker, ModalTextInput, ModalDatePicker } from "../components/modals/Inputs";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from "../components/Button";
import * as ImagePicker from 'expo-image-picker';
import axios from "../utils";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';


const ProfileScreen = props => {
  const [form, setForm] = useState({
    name: props.data?.name || '',
    biography: props.data?.biography || '',
    address: props.data?.address || '',
    birth_date: props.data?.birth_date? new Date(Date.parse(props.data.birth_date)) : new Date(),
    image: props.data?.image || null,
  })
  const editable = true;
  useEffect(()=>{
    axios().get('/whoami')
    .then(res => {
      setForm({
        image: res.data.image,
        name: res.data.name,
        biography: res.data.biography,
        address: res.data.address,
        birth_date: res.data.birth_date? new Date(Date.parse(res.data.birth_date)) : new Date(),
      })
    })
  }, [])
  const dispatch = useDispatch()
  return (
    <View
        style={styles.container}
    >
      <Section title='Meu Perfil'>
        <Button
          style={styles.saveButton}
          onPress={()=>{
            axios().post('/user/update', form)
            .then(res => {
              Toast.show({
                type: 'success',
                text1: 'Salvo com sucesso! ;)',
                // text2: 'Os seus dados foram atualizados',
              });
            })
            .catch(err => {
              Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro :(',
                text2: 'Tente novamente mais tarde',
              });
            })
          }}
        >
          <Icon
            name='save'
            size={30}
            style={{color: '#000'}}
            light
          />
        </Button>
      </Section>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="height"
        keyboardVerticalOffset={26}
        enabled
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
          <ModalTextInput
            labelStyle={styles.input}
            editable={editable}
            title='Biografia'
            style={styles.multiLine}
            multiline={true}
            value={String(form.biography)}
            onChangeText={(v) => {
              setForm({...form, biography: v})
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
          <Button
            style={styles.button}
            onPress={()=>{
              dispatch({type: 'LOGOUT'})
            }}
          >
            <Text
              style={styles.text}
            >
              Sair do Aplicativo
            </Text>
          </Button>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <Footer/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: Dimensions.get('window').height - StatusBar.currentHeight,
    width: Dimensions.get('window').width
  },
  saveButton: {
    backgroundColor: null,
    borderWidth: 0,
    width: 40,
    height: 40
  },
  viewContainer: {
    display: 'flex',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 0,
  },
  multiLine:{
    height: 80,
  },
  inputsContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F6A80E',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  input: {
    marginTop: 16,
  },
  imagePicker: {
    margin: 8,
  },
  button: {
    alignSelf: 'center',
    marginTop: 40,
    width: '100%',
    backgroundColor: '#F6A80E'
  },
  text: {
    fontWeight: 'bold'
  }
})


export default ProfileScreen