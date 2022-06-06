import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from '../utils';


const placeholders = {
  place: require('../assets/place.png'),
  activity: require('../assets/activity.png')
}


const Card = (props) => {
  function toggleBookmark() {
    const endpoint = `/activity/${props.id}/${props.favorite? 'unbook' : 'book'}`
    axios().post(endpoint)
    .then(res => {
      props.onToggleBookmark && props.onToggleBookmark()
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
        <View
          style={styles.cardHeader}
        >
          <Text
            style={styles.headerText}
            numberOfLines={1}
          >
            {props.title}
          </Text>
          <Icon
              name='chevron-right'
              size={20}
              style={{fontSize: 24, paddingRight: 12}}
              light
              onPress={props.onDelete}
            />
        </View>
        <View
          style={styles.cardContent}
        >
          <View
            style={styles.imageView}
          >
            <Image
              style={props.image? styles.image : styles.imageUnselected}
              source={props.image? {
                uri: `data:image/png;base64,${props.image}`
              } : placeholders[props.placeholder || 'activity']}
            />
          </View>
          <View
            style={styles.cardInfo}
          >
            {!props.nonInteractable && <Icon
              name={props.editable? 'trash-alt' : 'bookmark'}
              size={25}
              style={[styles.bookMark]}        
              solid={props.favorite}
              onPress={props.editable? props.onDelete: toggleBookmark}
            />}
            <Text
              numberOfLines={1}
              style={{color: '#A1A1A1', fontSize: 12, marginTop: 4}}
            >
              Descrição
            </Text>
            <Text
              style={styles.text}
              numberOfLines={2}
            >
              {props.description}
            </Text>
            <Text
              style={{color: '#A1A1A1', fontSize: 12, marginTop: 4}}
            >
              Localização
            </Text>
            <Text
              style={{...styles.text, height: 30}}
              numberOfLines={1}
            >
              {props.address}
            </Text>
          </View>
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
    width: '100%'
  },
  bookMark: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 8,
    fontSize: 20,
    zIndex: 1
  },
  card: {
    // margin: 20,
    borderColor: '#F6A80E',
    borderWidth: 3,
    height: 186,
    // width: 340,
    borderRadius: 12,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardHeader: {
    height: 48,
    width: '101%',
    backgroundColor: '#F6A80E',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardContent: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row'
  },
  cardInfo: {
    flex: 1,
    // backgroundColor: 'red'
  },
  headerText: {
    paddingLeft: 12,
    color: '#fff',
    height: '100%',
    width: "80%",
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    color: '#000',
    height: 45,
    fontSize: 14,
    width: 189,
    textAlignVertical: 'center'
  },
  imageView:{
    margin: 10,
    backgroundColor: '#F6A80E',
    borderRadius: 55,
    width: 110,
    height: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageUnselected: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  image: {
    borderColor: '#F6A80E',
    backgroundColor: '#F6A80E',
    borderRadius: 55,
    borderWidth: 1,
    width: 110,
    height: 110,
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