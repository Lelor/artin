import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, StyleSheet, Modal, Text } from 'react-native'
import AddPostModal from '../../components/modals/AddPostModal'
import axios from '../../utils'
import Card from '../../components/Card'


const ActivitiesTab = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const loadCards = () => {
    axios().get('/activity/list/main')
    .then(res => {
      setCards(res.data.activities)
    })
  }
  function showModal(card) {
    card ? setCurrentCard(card): setCurrentCard(null)
    setModalVisible(true)
  }
  function toggleFavorite(id) {
    setCards(cards.map(c=>{
      if (c.id === id)
        return {...c, is_favorite: !c.is_favorite}
      return c
    }))
  }
  useFocusEffect(useCallback(loadCards, []))
  return (
    <>
      <Modal
        visible={modalVisible}
        >
        <AddPostModal
          data={currentCard}
          mode='view'
          onCancel={() => {
            setModalVisible(false)
          }}
        />

      </Modal>
      <ScrollView style={styles.view} contentContainerStyle={styles.scrollView}>
        {cards.map(card => {
          return (
          <Card
            key={card.id}
            id={card.id}
            description={card.description}
            style={styles.card}
            favorite={card.is_favorite}
            image={card.image}
            address={card.address}
            title={card.title}
            onToggleBookmark={()=>toggleFavorite(card.id)}
            onPress={()=> showModal(card)}
          />
        )})}
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