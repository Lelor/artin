import { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Modal, Image, View, Text, Pressable } from 'react-native'
import Footer from '../../components/Footer'
import Section from '../../components/Section'
import Button from '../../components/Button'
import AddPostModal from '../../components/modals/AddPostModal'
import AddPlaceModal from '../../components/modals/AddPlaceModal'
import axios from '../../utils'
import Card from '../../components/Card'


const UserBookings = (props) => {
  const [activityModalVisible, setActivityModalVisible] = useState(false)
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const loadCards = () => {
    axios().get('/activity/list/bookings')
    .then(res => {
      setCards(res.data.activities)
    })
  }
  const removeCard = (id) => {
    setCards(cards.filter(c=>c.id !== id))
  };
  useEffect(loadCards, [])
  return (
    <>
      <Modal
        visible={activityModalVisible}
        >
        <AddPostModal
          data={currentCard}
          mode='view'
          onCancel={() => {
            setCurrentCard(null)
            setActivityModalVisible(false)
          }}
        />
      </Modal>
      <Section
      title='Meus Interesses'
      />
      {cards.length?
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
            onToggleBookmark={()=>removeCard(card.id)}
            onPress={()=> {
                setCurrentCard(card)
                setActivityModalVisible(true)
            }}
          />
        ))}
      </ScrollView>
      :
      (
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text>Você ainda não salvou nenhuma atividade.</Text>
        </View>
      )
      }
      <Footer/>
    </>
  )
}


const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  modalView: {
    backgroundColor: '#B87EDC',
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    width: 340,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    paddingBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    color: '#fff',
    height: 40,
    width: '100%',
    padding: 8,
    textAlign: 'center'
  },
  button: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: '#000',
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


const styles = StyleSheet.create({
    view: {
        flex: 1,
        // backgroundColor: 'red'
    },
    scrollView: {
      alignItems: 'center'
    },
    button: {
      backgroundColor: null,
      borderWidth: 0,
      width: 40,
      height: 40
    },
    card: {
      padding: 16,
      paddingBottom: 0
    }
  });


export default UserBookings