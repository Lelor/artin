import { useState } from 'react'
import axios from '../utils'
import { Text, View, StyleSheet, Image, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { loginAction } from '../reducers'
import { connect } from 'react-redux'
import Input from '../components/TextInput'
import Button from '../components/Button'


const Login = (props: any) => {
  const navigation = useNavigation()
  const [loginState, setLoginState] = useState({email: '', password: ''})

  const submitLogin = async () => {
    await axios.post('/login', loginState)
    .then((res: any)=>{
      axios.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`
      props.dispatch(loginAction(res.data.access_token))
      navigation.navigate('Main', {token: props.token})
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
          // underlineColorAndroid='transparent'
          placeholder="Email"
          style={styles.input}
          onChangeText={(text: String) => (setLoginState({...loginState, email: text}))}
        />
        <Input
          // underlineColorAndroid='transparent'
          placeholder="Password"
          onChangeText = {(text: String) => (setLoginState({...loginState, password: text}))}
          style={[{marginTop: 10}, styles.input]}
        />
        <Button
          style={styles.button}
          onPress={submitLogin}
        >
          <Text>Submit</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={()=>{console.log(props.token)}}
        >
          <Text>storedata</Text>
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
    borderColor: 'red',
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
    width: 100,
    fontSize: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#b0b0b0'
  },
  button: {
    width: 60,
    height: 25,
    marginTop: 50,
    backgroundColor: '#b0b0b0'
  }
})

export default Login