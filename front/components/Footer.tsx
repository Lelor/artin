import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'


const FooterButton = (props: any) => (
    <TouchableOpacity
      style={styles.footerButton}
    >
        <Text>teste</Text>
    </TouchableOpacity>
)


const Footer = (props: any) => (
    <View style={[props.style, styles.footerView]}>
      <FooterButton/>
      <FooterButton/>
      <FooterButton/>
      <FooterButton/>
    </View>
  )


const styles = StyleSheet.create({
    footerButton: {
        // borderWidth: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    footerView: {
        borderTopWidth: 1,
        borderColor: "#b0b0b0",
        flexDirection: "row",
        display: "flex",
    }
  });


export default Footer;