import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/split-bills/create-group.style.js'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors.js'

const Creategroup = () => {
  return (
   <View style={styles.container}>
    <View style={ styles.header}>
    <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
    </View>
   </View>
  )
}

export default Creategroup