import { useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Modal, Image, View, Text, Pressable } from 'react-native'
import Footer from '../../components/Footer'
import Section from '../../components/Section'
import Button from '../../components/Button'
import AddPostModal from '../../components/modals/AddPostModal'
import AddPlaceModal from '../../components/modals/AddPlaceModal'
import axios from '../../utils'
import Card from '../../components/Card'
import UserPostsContext from './Context'
import Toast from 'react-native-toast-message';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();


const UserPosts = (props) => {
  const [activityModalVisible, setActivityModalVisible] = useState(false)
  const [placeModalVisible, setPlaceModalVisible] = useState(false)
  const [selectModalVisible, setSelectModalVisible] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [placeModalMode, setPlaceModalMode] = useState('create')
  const [cards, setCards] = useState([])
  const [places, setPlaces] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [currentPlace, setCurrentPlace] = useState(null)
  const loadCards = async () => {
    await axios().get('/activity/list/user')
    .then(res => {
      setCards(res.data.activities)
    })
    await axios().get('/place/list/user')
    .then(res => {
      setPlaces(res.data.places)
    })
  }
  const removeCard = (id) => {
    setCards(cards.filter(c=>c.id !== id))
    Toast.show({
      type: 'success',
      text1: 'Removido com sucesso! ;)',
    });
  };

  const removePlace = (id) => {
    setPlaces(places.filter(c=>c.id !== id))
    Toast.show({
      type: 'success',
      text1: 'Removido com sucesso! ;)',
    });
  };

  function showModal(card, mode) {
    card ? setCurrentCard(card): setCurrentCard(null)
    mode ? setModalMode(mode): setModalMode('create')
    setActivityModalVisible(true)
  }
  function showPlaceModal(card, mode) {
    card ? setCurrentPlace(card): setCurrentPlace(null)
    mode ? setPlaceModalMode(mode): setModalMode('create')
    setPlaceModalVisible(true)
  }
  const ActivityTab = () => (cards.length?
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
          editable
          onPress={()=> showModal(card, 'update')}
          onDelete={()=>{
            axios().post(`/activity/${card.id}/delete`)
            .then(res => {
              removeCard(card.id)
            })
            .catch(err => {
              Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro :(',
                text2: 'Tente novamente mais tarde'
              });
            })
          }}
        />
      ))}
    </ScrollView>
    :
    (
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Text>Você ainda não criou nenhuma atividade.</Text>
      </View>
    )
  )
  const PlacesTab = () => {
    return (places.length?
    <ScrollView style={styles.view} contentContainerStyle={styles.scrollView}>
      {places.map(card => (
        <Card
          key={card.id}
          id={card.id}
          description={card.description}
          style={styles.card}
          favorite={card.is_favorite}
          image={card.image}
          address={card.address}
          title={card.name}
          editable
          onPress={()=> showPlaceModal(card, 'update')}
          onDelete={()=>{
            axios().post(`/place/${card.id}/delete`)
            .then(res => {
              removePlace(card.id)
            })
            .catch(err => {
              Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro :(',
                text2: 'Tente novamente mais tarde'
              });
            })
          }}
        />
      ))}
    </ScrollView>
    :
    (
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Text>Você ainda não criou nenhum centro.</Text>
      </View>
    )
  )}
  useEffect(loadCards, [])
  return (
    <UserPostsContext.Provider value=''>
    <Modal
      // animationType="slide"
      transparent={true}
      visible={selectModalVisible}
      onRequestClose={() => {
        setActivityModalVisible(!activityModalVisible);
      }}
      style={{backgroundColor: 'rgb(0, 0, 0, 0.8)'}}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>Selecione a opção desejada</Text>
          <Button
            style={modalStyles.button}
            onPress={() => {
              setCurrentCard(null)
              setSelectModalVisible(false)
              setPlaceModalVisible(true)
            }}
          >
            <Text style={modalStyles.textStyle}>Novo Centro</Text>
          </Button>
          <Button
            style={modalStyles.button}
            onPress={() => {
              setCurrentCard(null)
              setSelectModalVisible(false)
              setActivityModalVisible(true)
            }}
          >
            <Text style={modalStyles.textStyle}>Nova Atividade</Text>
          </Button>
          <Button
            style={modalStyles.button}
            onPress={() => {
              setSelectModalVisible(false)
            }}
          >
            <Text style={modalStyles.textStyle}>Fechar</Text>
          </Button>
        </View>
      </View>
    </Modal>
      <Modal
        visible={activityModalVisible}
        >
        <AddPostModal
          data={currentCard}
          mode={modalMode}
          onSubmit={() => {
            loadCards()
            setActivityModalVisible(false)
          }}
          onCancel={() => {
            setActivityModalVisible(false)
          }}
        />
      </Modal>
      <Modal
        visible={placeModalVisible}
        >
        <AddPlaceModal
          data={currentPlace}
          mode={placeModalMode}
          onSubmit={() => {
            loadCards()
            setPlaceModalVisible(false)
          }}
          onCancel={() => {
            setPlaceModalVisible(false)
          }}
        />
      </Modal>
      <Section
      title='Meus Registros'
      >
        <Button
          style={styles.button}
          // onPress={()=>{showModal(null, 'create')}}
          onPress={()=>(setSelectModalVisible(true))}
        >
          <Image
            style={{width: 32, height: 32}}
            source={require('../../assets/new.png')}
            resizeMode='cover'
          />
        </Button>
      </Section>
      <Tab.Navigator>
        <Tab.Screen
          name='Atividades'
          component={ActivityTab}
        />
        <Tab.Screen
          name='Centros'
          component={PlacesTab}
        />
      </Tab.Navigator>
      <Footer/>
    </UserPostsContext.Provider>
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
      width: 32,
      height: 32
    },
    card: {
      padding: 16,
      paddingBottom: 0
    }
  });


export default UserPosts