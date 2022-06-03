
import Footer from '../components/Footer'
import ActivitiesTab from './ActivitiesTab'
import PlacesTab from './PlacesTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const Main = (props) => {
  return (
  <>
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16, color: '#fff', fontWeight: 'bold'},
        tabBarItemStyle: { height: 60 },
        tabBarStyle: { backgroundColor: '#B87EDC' },
      }}
    >
      <Tab.Screen 
          name='Atividades'
          component={ActivitiesTab}
      />
      <Tab.Screen 
          name='Centros'
          component={PlacesTab}
      />
    </Tab.Navigator>
    <Footer/>
  </>
  )
}

export default Main