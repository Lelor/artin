import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from '../utils';


const Card = (props: any) => {
  const [cardState, setCardState] = useState({favorite: props.favorite})

  function toggleBookmark() {
    const endpoint = `/activity/${props.id}/${cardState.favorite? 'unbook' : 'book'}`
    axios().post(endpoint)
    .then(res => {
      setCardState({...cardState, favorite: !cardState.favorite})
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <>
    <TouchableOpacity
      style={[props.style, styles.shadow]}
      onPress={props.onPress}
      activeOpacity={1}
    >
      <View
        style={[styles.card]}
      >
        <Image
          style={styles.image}
          // source={require('../assets/gnu-logo.png')}
          source={props.image? {
            uri: `data:image/png;base64,${props.image}`
          } : require('../assets/gnu-logo.png')}
        />
        <View
          style={styles.outline}
        >
          {
            props.editable?
            <Icon
              name='trash-alt'
              size={20}
              style={styles.editIcons}
              solid
              onPress={props.onDelete}
            />
            :
            <Icon
              name='bookmark'
              size={25}
              style={[styles.editIcons]}        
              solid={cardState.favorite}
              onPress={toggleBookmark}
            />
          }
          <Text
            style={styles.text}
            numberOfLines={7}
          >
            {props.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    // margin: 20,
    borderColor: '#b4b4b4',
    borderWidth: 1,
    height: 170,
    width: 340,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    padding: 5,
    borderColor: 'red',
    borderWidth: 1,
    height: 124,
    width: 210,
    fontSize: 17
  },
  image: {
    flex: 1,
    margin: 10,
    width: 130,
    height: 168,
    resizeMode: 'cover',
},
  icon: {
    position: 'absolute',
    marginLeft: 300,
    marginTop: -3,
    zIndex: 1,
  },
  editIcons: {
    padding: 8,
    // fontSize: 24,
    alignSelf: 'flex-end'
    // paddingTop: 0
  },
  outline: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

export default Card