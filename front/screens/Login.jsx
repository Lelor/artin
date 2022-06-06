import { useState } from 'react'
import axios from '../utils'
import { Text, View, StyleSheet, Image, Modal, KeyboardAvoidingView, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/TextInput'
import Button from '../components/Button'
import { useDispatch } from 'react-redux';
import NewUserModal from '../components/modals/NewUserModal';
import Toast from 'react-native-toast-message';


const LoginInput = props => {
  return (
    <>
    <Text
      style={{color: '#A1A1A1', fontSize: 16, marginTop: 16}}
    >
      {props.title}
    </Text>
    <Input
      {...props}
      style={styles.input}
    />
    </>
  )
}


const Login = (props) => {

  const [loginState, setLoginState] = useState({email: '', password: ''})
  const [screenState, setScreenState] = useState({error: false})
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigation()
  const submitLogin = async () => {
    await axios().post('/login', loginState)
    .then(async (res)=>{
      await AsyncStorage.setItem('TOKEN', res.data.access_token)
      dispatch({type: 'LOGIN', token: res.data.access_token})
    })
    .catch(err => {
      if (err.status !== 200)
        setScreenState({...screenState, error: true})
    })
  }

  return (
    <>
      <Modal
        visible={showModal}
        >
        <NewUserModal
          onSubmit={() => {
            setShowModal(false)
            Toast.show({
              type: 'success',
              text1: 'Sucesso!',
              text2: 'Usuário cadastrado com sucesso',
            });
          }}
          onCancel={() => {
            setShowModal(false)
          }}
        />
      </Modal>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#B87EDC'}}
        behavior='position'
      >
        <View
          style={styles.view}
        >
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <View
            style={{padding: 24, paddingBottom: 0, display: 'flex', alignItems: 'center'}}
          >
            <Text
              style={styles.introText}
            >
              Encontre centros artísticos...
            </Text>
            <Text
              style={{...styles.introText, color: '#D9D9D9', marginTop: 4}}
            >
              Encontre atividades para participar...
              </Text>
            <Text
              style={{...styles.introText, marginTop: 4}}
            >
              Conheça e participe de novas
            </Text>
            <Text
              style={styles.introText}
            >
              modalidades artísticas...
            </Text>
          </View>
            <View
              style={styles.loginContainer}
            >
              <LoginInput
                title='E-mail'
                error={screenState.error}
                style={styles.input}
                onChangeText={(text) => (setLoginState({...loginState, email: text}))}
              />
              <LoginInput
                title='Senha'
                secureTextEntry={true}
                error={screenState.error}
                onChangeText = {(text) => (setLoginState({...loginState, password: text}))}
                style={[{marginTop: 10, width: 150}, styles.input]}
              />
              {screenState.error && 
                <Text
                  style={styles.errorText}
                >
                  Credenciais inválidas
                </Text>}
              <Button
                style={styles.buttonPrimary}
                onPress={submitLogin}
              >
                <Text
                  style={{fontWeight: 'bold'}}
                >
                  Login
                </Text>
              </Button>
              <Button
                style={styles.buttonSecondary}
                onPress={()=>setShowModal(true)}
              >
                <Text
                  style={{fontWeight: 'bold'}}
                >
                  Criar Conta
                </Text>
              </Button>
            </View>  
        </View>
      </KeyboardAvoidingView>
    </>
  )
}


const styles = StyleSheet.create({
  logo: {
    width: 210,
    height: 210,
    alignSelf: 'center'
  },
  loginContainer: {
    marginTop: 36,
    borderColor: '#F6A80E',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    padding: 16,
    // height: '100%',
  },
  input: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  buttonPrimary: {
    width: '100%',
    height: 30,
    marginTop: 32,
    backgroundColor: '#F6A80E'
  },
  buttonSecondary: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    margin: 8,
    marginBottom: 0
  },
  errorText: {
    color: 'red',
    paddingTop: 15
  },
  introText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  }
})

export default Login