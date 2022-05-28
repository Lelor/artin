import { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from 'react-redux'
import { store } from './reducers'
import Main from './screens/Main'
import Login from './screens/Login'
import UserPosts from './screens/UserPosts'

import useCachedResources from './hooks/useCachedResources';

const Stack: any = createNativeStackNavigator();

function Content() {
  // AsyncStorage.clear()
  const [storageToken, setStorageToken] = useState(null)
  const sessionToken = useSelector((state: any) => state.token)
  AsyncStorage.getItem('TOKEN')
    .then((token: any) => setStorageToken(token))
  return (
    <NavigationContainer>
      <StatusBar
      animated={true}
      hidden={false} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none'
        }}
      >
        {sessionToken || storageToken?
        <>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            animationEnabled: false
          }}
        />
        <Stack.Screen
          name="UserPosts"
          component={UserPosts}
        />
        </>
        :
        <>
        <Stack.Screen name="Login" component={Login}/>
        </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store = {store}>
        <Content/>
      </Provider>
    );
  }
}

export default App
