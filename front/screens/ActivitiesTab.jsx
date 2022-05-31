import { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Modal, Text } from 'react-native'
import AddPostModal from '../components/modals/AddPostModal'
import axios from '../utils'
import Card from '../components/Card'


const ActivitiesTab = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const loadCards = () => {
    axios().get('/activity/list/user')
    .then(res => {
      setCards(res.data.activities)
    })
  }
  function showModal(card) {
    card ? setCurrentCard(card): setCurrentCard(null)
    setModalVisible(true)
  }
  useEffect(loadCards, [])
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
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            description={card.description}
            style={styles.card}
            favorite={card.is_favorite}
            image={card.image}
            address={card.address}
            title={card.title}
            onPress={()=> showModal(card)}
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
      padding: 16
    }
  });


export default ActivitiesTab