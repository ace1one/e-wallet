import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors';

type Props = {
  error: string;
  onClose: () => void;
};

const ErrorContainer = ({ error, onClose}: Props) => {
  if(!error) return null;
  return (
    
        <View style={ styles.errorBox }>
          <Ionicons name="alert-circle" size={20} color={COLORS.error} />
          <Text style={ styles.errorText }>{error}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
       )
}

export default ErrorContainer