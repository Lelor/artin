import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MainTabs, { Tab } from '../components/Tabs'
import UserPosts from '../screens/UserPosts'
import { useNavigation } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


export const FooterButton = (props: any) => (
    <TouchableOpacity
      style={styles.footerButton}
      onPress={props.onPress}
    >
        <Text>{props.title}</Text>
    </TouchableOpacity>
)


const Footer = (props: any) => {
  const navigation = useNavigation()
  return (
    <View style={[props.style, styles.footerView]}>
      <FooterButton
        title='Home'
        onPress={() => {navigation.navigate('Main')}}
      />
      <FooterButton
        title='Atividades'
      />
      <FooterButton
        title='Registros'
        onPress={() => {navigation.navigate('UserPosts')}}
      />
      <FooterButton
        title='Perfil'
      />
    </View>
  )
}


const styles = StyleSheet.create({
    footerButton: {
        // borderWidth: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    footerView: {
        height: 60,
        borderTopWidth: 1,
        borderColor: "#b0b0b0",
        flexDirection: "row",
        display: "flex",
    }
  });


export default Footer;