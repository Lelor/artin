import { StyleSheet, View } from "react-native";
import { ModalFooter, ModalHeader } from "./ModalUtils";


const Modal = ({onCancel, onSubmit, onDelete, children, mode, title}) => {
  const editable = mode !== 'view'
  return (
    <View
      style={{...styles.modalContainer, paddingBottom: editable? 0: styles.modalContainer.paddingBottom}}
    >
      {!editable && <ModalHeader onCancel={onCancel} title={title}/>}
      {children}
      {editable && (
        <ModalFooter
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#B87EDC',
    padding: 16,
    paddingTop: 0,
  },
}) 

export default Modal