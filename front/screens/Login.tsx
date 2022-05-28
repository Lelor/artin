import { useState, useEffect } from 'react'
import axios from '../utils'
import { Text, View, StyleSheet, Image, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/TextInput'
import Button from '../components/Button'
import { useDispatch } from 'react-redux';


const Login = (props) => {
  const [loginState, setLoginState] = useState({email: '', password: ''})
  const [screenState, setScreenState] = useState({error: false})
  const dispatch = useDispatch()
  const nav = useNavigation()
  const submitLogin = async () => {
    await axios().post('/login', loginState)
    .then(async (res: any)=>{
      await AsyncStorage.setItem('TOKEN', res.data.access_token)
      dispatch({type: 'LOGIN', token: res.data.access_token})
    })
    .catch(err => {
      if (err.status !== 200)
        setScreenState({...screenState, error: true})
    })
  }

  return (
    <View
      style={styles.view}
    >
      <Image
        style={styles.logo}
        source={require('../assets/gnu-logo.png')}
      />
      <View
        style={styles.loginContainer}
      >
        <Input
          placeholder="Email"
          error={screenState.error}
          style={styles.input}
          onChangeText={(text: String) => (setLoginState({...loginState, email: text}))}
        />
        <Input
          secureTextEntry={true}
          placeholder="Password"
          error={screenState.error}
          onChangeText = {(text: String) => (setLoginState({...loginState, password: text}))}
          style={[{marginTop: 10, width: 150}, styles.input]}
        />
        {screenState.error && 
          <Text
            style={styles.errorText}
          >
            Credenciais inválidas
          </Text>}
        <Button
          style={styles.button}
          onPress={submitLogin}
        >
          <Text
            style={{fontWeight: 'bold'}}
          >
            Login
          </Text>
        </Button>
      </View>  
    </View>
  )
}


const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 25
  },
  loginContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  input: {
    // width: 100,
    fontSize: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#b0b0b0'
  },
  button: {
    width: 100,
    height: 45,
    marginTop: 80,
    backgroundColor: '#8cff66'
  },
  errorText: {
    color: 'red',
    paddingTop: 15
  }
})

export default Login