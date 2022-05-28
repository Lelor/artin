
import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native'
import { Tabs } from '../components'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'


const Main = (props) => {
  return (
  <>
    <Tabs/>
    <Footer/>
  </>
  )
}


export default Main