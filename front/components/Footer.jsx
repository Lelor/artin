import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TicketI from '../assets/svg/local_activity.svg'
import UserI from '../assets/svg/user.svg'
import BookmarkI from '../assets/svg/bookmark.svg'
import HomeI from '../assets/svg/home.svg'

const iconSize = 32
const Icons = {
  home: <HomeI width={iconSize} height={iconSize}/>,
  ticket: <TicketI/>,
  bookmark: <BookmarkI width={iconSize} height={iconSize}/>,
  user: <UserI width={iconSize} height={iconSize}/>,
}


export const FooterButton = (props) => (
    <TouchableOpacity
      style={styles.footerButton}
      onPress={props.onPress}
    >
      {Icons[props.icon]}
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
        title='Atividades'
        icon='bookmark'
      />
      <FooterButton
        title='Registros'
        icon='ticket'
        onPress={() => {navigation.navigate('UserPosts')}}
      />
      <FooterButton
        title='Perfil'
        icon='user'
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
    icon: {
      fontSize: 40,
    }
  });


export default Footer;