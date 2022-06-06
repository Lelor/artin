import { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './reducers'
import ProfileScreen from './screens/Profile';
import Main from './screens/Main'
import Login from './screens/Login'
import UserPosts from './screens/UserPosts'
import UserBookings from './screens/UserBookings';
import Toast from 'react-native-toast-message';

import useCachedResources from './hooks/useCachedResources';

const Stack: any = createNativeStackNavigator();

function Content() {
  // AsyncStorage.clear()
  const [storageToken, setStorageToken] = useState(null)
  const sessionToken = useSelector((state: any) => state.token)
  const dispatch = useDispatch()
  AsyncStorage.getItem('TOKEN')
    .then((token: any) => {
      setStorageToken(token)
      dispatch({type: 'LOGIN', token})
    })
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
        {storageToken?
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Bookings"
          component={UserBookings}
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
      <>
      <Provider store = {store}>
        <Content/>
      </Provider>
      <Toast visibilityTime={2000} />
      </>
    );
  }
}

export default App
