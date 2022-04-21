import { Text } from 'react-native'
import Button from './Button'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from '../utils'


const Teste = (props: any) => (
    <Button
        onPress={()=> {
            axios.get('/whoami')
            .then(res => console.log(res.data))
        }}
    >
        <Text>
            oi
        </Text>
    </Button>
  )
  
const Tab: any = createMaterialTopTabNavigator();


const Tabs = (props: any) => (
    <Tab.Navigator>
      <Tab.Screen 
          name='Home'
          component={Teste}/>
      <Tab.Screen 
          name='Xpto'
          component={Teste}/>
    </Tab.Navigator>
)


export default Tabs