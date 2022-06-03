import { View, StyleSheet, Text } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';


export const ModalFooter = ({onDelete, onCancel, onSubmit, hideDelete}) => (
  <View
      style={styles.editFooter}
  >
    <Icon
      name='chevron-left'
      size={20}
      style={styles.footerIcons}
      light
      onPress={onCancel}
    />
    {hideDelete && <Icon
      name='trash-alt'
      size={20}
      style={styles.footerIcons}
      light
      onPress={onDelete}
    />}
    <Icon
      name='save'
      size={20}
      style={styles.footerIcons}
      light
      onPress={onSubmit}
    />
  </View>
)

export const ModalHeader = ({onCancel, title}) => (
  <View
      style={styles.headerTitle}
    >
      <Icon
        name='chevron-left'
        size={20}
        style={{fontSize: 24, paddingRight: 12}}
        light
        onPress={onCancel}
      />

      <Text
        style={{fontSize: 18, fontWeight: 'bold', color: '#fff', paddingLeft: 16}}
      >
        {title}
      </Text>
    </View>
)



const styles = StyleSheet.create({
  headerTitle: {
    height: 60,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center'
  },
  footerIcons: {
    fontSize: 24,
    paddingRight: 12
  },
  editFooter:{
    paddingHorizontal: 16,
    height: 50,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})


export default ModalFooter