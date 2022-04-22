import { useEffect, useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './reducers'
import axios from './utils'
import Main from './screens/Main'
import Login from './screens/Login'

import useCachedResources from './hooks/useCachedResources';

const Stack: any = createNativeStackNavigator();

function App() {
  const isLoadingComplete = useCachedResources();
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    axios.get('/whoami')
    .then(res => {
      console.log(res.status)
      setIsAuthenticated(res.status === 200)
    })
    .catch((err: any) => {setIsAuthenticated(true)})
    , []
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store = {store}>
        <NavigationContainer>
        <StatusBar
        animated={true}
        // backgroundColor="#61dafb"
        hidden={false} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {isAuthenticated?
            <>
            <Stack.Screen name="Main" component={Main}/>
            </>
            :
            <>
            <Stack.Screen name="Login" component={Login}/>
            </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App
