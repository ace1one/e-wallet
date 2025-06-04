import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'
import { styles } from '@/assets/styles/home.styles'

const AmountMasking = ({isAmountShow}: { isAmountShow:boolean}) => {
  return (
    <View >
     <Ionicons 
        style={ styles.amountMaskingIcon}
         name={isAmountShow ? "eye-off-outline" : "eye-outline"} 
         size={24} 
         color={COLORS.primary}
         />
    </View>
  )
}

export default AmountMasking