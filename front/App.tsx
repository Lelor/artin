import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { store } from './reducers'
import { connect } from 'react-redux'
import Main from './screens/Main'
import Login from './screens/Login'

import useCachedResources from './hooks/useCachedResources';

// const navigation = useNavigation()

const Stack: any = createNativeStackNavigator();


function MainApp(props: any) {
  return (
  <NavigationContainer>
    {/* <StatusBar
    animated={true}
    backgroundColor="#61dafb"
    hidden={false}
    /> */}
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="Login">
          {(otherProps: any) => <Login {...props} {...otherProps}/>}
        </Stack.Screen>
        <Stack.Screen name="Main">
          {(otherProps: any) => <Main {...props} {...otherProps}/>}
        </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const mapStateToProps = (state: any) => {
  return {token: state}
}

const MainWrapped = connect(mapStateToProps)(MainApp)

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store = {store}>
        <MainWrapped/>
      </Provider>
    );
  }
}

export default App
