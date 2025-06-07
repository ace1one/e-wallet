import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '@/assets/styles/home.styles'
import { COLORS } from '@/constants/colors'
import PopoverModal from './Modal'
import { useState } from 'react'


export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const [modalVisible, setModalVisible] = useState(false);
  const handleSignOut = async () => {
    //  Alert.alert("Sign Out", "Are you sure you want to sign out?", [
    //   { text: "Cancel", style: "cancel" },
    //   { text: "Sign Out", style: "destructive", onPress: ()=> signOut() }
    // ])
    setModalVisible(true);
    
  }
  return (
    <TouchableOpacity onPress={handleSignOut} style={ styles.logoutButton}>
      <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
      <PopoverModal
        visible={modalVisible}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        buttonName="Proceed"
        onCancel={() => setModalVisible(false)}
        onConfirm={()=>signOut()}
      />
    </TouchableOpacity>
  )
}