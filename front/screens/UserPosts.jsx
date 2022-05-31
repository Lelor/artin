import { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Modal, Text } from 'react-native'
import Footer from '../components/Footer'
import Section from '../components/Section'
import Button from '../components/Button'
import AddPostModal from '../components/modals/AddPostModal'
import axios from '../utils'
import Card from '../components/Card'




const UserPosts = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const loadCards = () => {
    axios().get('/activity/list/user')
    .then(res => {
      setCards(res.data.activities)
    })
  }
  const removeCard = (id) => setCards(data.splice(data.findIndex(el => el.id === id), 1));
  function showModal(card, mode) {
    card ? setCurrentCard(card): setCurrentCard(null)
    mode ? setModalMode(mode): setModalMode('create')
    setModalVisible(true)
  }
  console.log(cards.length)
  useEffect(loadCards, [])
  return (
    <>
      <Modal
        visible={modalVisible}
        >
        <AddPostModal
          data={currentCard}
          mode={modalMode}
          onSubmit={() => {
            loadCards()
            setModalVisible(false)
          }}
          onCancel={() => {
            setModalVisible(false)
          }}
        />

      </Modal>
      <Section
      title='Meus Registros'
      >
        <Button
          style={styles.button}
          onPress={()=>{showModal(null, 'create')}}
        >
          <Text>+</Text>
        </Button>
      </Section>
      <ScrollView style={styles.view} contentContainerStyle={styles.scrollView}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            description={card.description}
            style={styles.card}
            favorite={card.is_favorite}
            image={card.image}
            editable
            onPress={()=> showModal(card, 'update')}
            onDelete={()=>{
              axios().post(`/activity/${card.id}/delete`)
              .then(res => {
                if(props.onDelete)()=>{
                  axios().post(`/activity/${props.id}/delete`)
                  .then(res => {
                    removeCard(card.id)
                  })
                  .catch(err => {
                  })
                }
              })
              .catch(err => {
              })
            }}
          />
        ))}
      </ScrollView>
      <Footer/>
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
      padding: 8
    }
  });


export default UserPosts