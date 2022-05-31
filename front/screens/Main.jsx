
import Footer from '../components/Footer'
import ActivitiesTab from './ActivitiesTab'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const Main = (props) => {
  return (
  <>
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: { height: 60 },
        tabBarStyle: { backgroundColor: '#B87EDC' },
      }}
    >
      <Tab.Screen 
          name='Atividades'
          component={ActivitiesTab}/>
    </Tab.Navigator>
    <Footer/>
  </>
  )
}

export default Main