import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/split-bills/home.styles.js'
import { Image } from 'expo-image'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import SplitBillCard from '@/components/SpliBillCard'

const SplitBillsIndex = () => {
  return (
    <View style={ styles.container }>
      <View style={ styles.content }>
        <View style={ styles.header }>
          <View style={ styles.headerLeft }>
            <Image source={require('../..//assets/images/split-bill.png')} style={ styles.headerLogo } />
            <Text style={ styles.headerTitle }>Split Bills</Text>
          </View>
          <View style={ styles.headerRight}>
            <TouchableOpacity style={ styles.groupAddButton}>
              <FontAwesome6 name="users-viewfinder" size={24} color="white" />
                <Text style={ styles.groupAddButtonText}>
                    Create Group
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      
      <SplitBillCard />
     
       
      </View>
    </View>

  )
}

export default SplitBillsIndex