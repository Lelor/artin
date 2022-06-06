import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, Modal, Text } from 'react-native'
import AddPlaceModal from '../components/modals/AddPlaceModal'
import axios from '../utils'
import Card from '../components/Card'


const ActivitiesTab = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const loadCards = () => {
    axios().get('/place/list')
    .then(res => {
      setCards(res.data.places)
    })
  }
  function showModal(card) {
    card ? setCurrentCard(card): setCurrentCard(null)
    setModalVisible(true)
  }
  useFocusEffect(useCallback(loadCards, []))
  return (
    <>
      <Modal
        visible={modalVisible}
        >
        <AddPlaceModal
          data={currentCard}
          mode='view'
          onCancel={() => {
            setModalVisible(false)
          }}
        />

      </Modal>
      <ScrollView style={styles.view} contentContainerStyle={styles.scrollView}>
        {cards.map(card => (
          <Card
            nonInteractable
            key={card.id}
            id={card.id}
            description={card.description}
            style={styles.card}
            // favorite={card.is_favorite}
            image={card.image}
            address={card.address}
            title={card.name}
            onPress={()=> showModal(card)}
            placeholder='place'
          />
        ))}
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        // backgroundColor: 'red'
    },
    scrollView: {
      alignItems: 'center'
    },
    button: {
      backgroundColor: '#fff'
    },
    card: {
      padding: 16,
      paddingBottom: 0
    }
  });


export default ActivitiesTab