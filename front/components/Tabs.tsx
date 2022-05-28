import { StyleSheet, ScrollView } from 'react-native'
import Button from './Button'
import Card from './Card'
import Modal from './Modal'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from '../utils'
const mockCards = [
    {
        id: 1,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: false
    },
    {
        id: 2,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: true
    },
    {
        id: 3,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: false
    },
    {
        id: 4,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: false
    },
    {
        id: 5,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: true
    },
    {
        id: 6,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: false
    },
    {
        id: 7,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: true
    },
    {
        id: 8,
        title: 'Banana',
        description: "This is supposed to be a very long text, like a lorem ipsum to test if the text wraps on the component accordingly. But as this is a mock, and I'm the one writing it i'll just fill it with as much embromeixon as I have the patience to write, which is ending right... NOW.",
        image: null,
        is_favorite: false
    }
]

const Teste = (props: any) => (
    <ScrollView
      contentContainerStyle={styles.cardsContainer}
    >
        {mockCards.map(card => (
          <Card
            key={card.id}
            description={card.description}
            style={styles.card}
            favorite={card.is_favorite}
          />
        ))}
    </ScrollView>
  )
  
export const Tab: any = createMaterialTopTabNavigator();


const Tabs = (props: any) => (
    <Tab.Navigator>
      <Tab.Screen 
          name='Home'
          component={Modal}/>
      <Tab.Screen 
          name='Xpto'
          component={Teste}/>
    </Tab.Navigator>
)


const styles = StyleSheet.create({
    cardsContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    card: {
        marginTop: 15
    }
})

export default Tabs