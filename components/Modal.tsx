// components/LogoutModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ModalProps {
  visible: boolean;
  title?: string; 
  message?: string;
  buttonName?: string;   
  onCancel: () => void;
  onConfirm: () => void;
}

const PopoverModal: React.FC<ModalProps> = ({ visible,title,message,buttonName, onCancel, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.okButton]}>
              <Text style={styles.okText}>{buttonName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default  PopoverModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  okButton: {
    backgroundColor: '#f44',
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  okText: {
    color: '#fff',
    fontWeight: '500',
  },
});
