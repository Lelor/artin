import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const icons = {
  home: require('../assets/home.png'),
  ticket: require('../assets/ticket.png'),
  bookmark: require('../assets/bookmark.png'),
  user: require('../assets/user.png'),
}


export const FooterButton = (props) => (
    <TouchableOpacity
      style={styles.footerButton}
      onPress={props.onPress}
    >
      <Image
        style={[styles.image, props.size? {width: props.size, height: props.size}: null]}
        source={icons[props.icon]}
      />
    </TouchableOpacity>
)


const Footer = (props) => {
  const navigation = useNavigation()
  return (
    <View style={[props.style, styles.footerView]}>
      <FooterButton
        title='Home'
        icon='home'
        onPress={() => {navigation.navigate('Main')}}
      />
      <FooterButton
        size={24}
        title='Atividades'
        icon='bookmark'
        onPress={() => {navigation.navigate('Bookings')}}
      />
      <FooterButton
        title='Registros'
        icon='ticket'
        onPress={() => {navigation.navigate('UserPosts')}}
      />
      <FooterButton
        title='Perfil'
        icon='user'
        onPress={() => {navigation.navigate('Profile')}}
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
        height: 54,
        borderTopWidth: 1,
        borderColor: "#b0b0b0",
        backgroundColor: "#B87EDC",
        flexDirection: "row",
        display: "flex",
    },
    image: {
      width: 32,
      height: 32,
    }
  });


export default Footer;