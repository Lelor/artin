import { TouchableOpacity, StyleSheet } from 'react-native'


const Button = (props: any) => (
  <TouchableOpacity
    style={[props.style, styles.button]}
    onPress={props.onPress}
    >
    {props.children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0b0b0',
    width: 70,
    height: 30
  }
})

export default Button