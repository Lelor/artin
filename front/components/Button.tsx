import { TouchableOpacity, StyleSheet } from 'react-native'


const Button = (props: any) => (
  <TouchableOpacity
    style={[styles.button, props.style]}
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
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    fontWeight: 'bold'
  }
})

export default Button