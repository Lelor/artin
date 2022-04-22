import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Image, Text, StyleSheet } from 'react-native'


const Card = (props: any) => {
  const [cardState, setCardState] = useState({favorite: props.favorite})

  function toggleBookmark() {
    setCardState({...cardState, favorite: !cardState.favorite})
  }

  return (
    <>
    <View
      style={props.style}
    >
      <Icon
        name='bookmark'
        size={25}
        style={[styles.icon]}        
        solid={cardState.favorite}
        onPress={toggleBookmark}
      />
      <View
        style={styles.card}
      >
        <Image
          style={styles.image}
          source={require('../assets/gnu-logo.png')}
        />
        <Text
          style={styles.text}
          numberOfLines={7}
        >
          {props.description}
        </Text>
      </View>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  card: {
    // margin: 20,
    borderColor: 'red',
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
    height: 150,
    width: 210,
    fontSize: 17
  },
  image: {
    flex: 1,
    margin: 10,
    resizeMode: 'contain',
},
  icon: {
    position: 'absolute',
    marginLeft: 300,
    marginTop: -3,
    zIndex: 1,
  }
})

export default Card