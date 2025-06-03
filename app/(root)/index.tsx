import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '@/hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader'
import { styles } from '@/assets/styles/home.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'


export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const { transactions, summary, loading, loadData, deleteTransaction  } =  useTransactions(user?.id)

  useEffect(() => {
    if (user?.id) {
      console.log('User ID:', user.id)
      loadData()
    }
  },[loadData])

console.log('Transactions:', summary)
if(loading) return <PageLoader />
  return (
    <View style={ styles.container}>
      <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image 
                source={require('../../assets/images/logo.png')}
                style={styles.headerLogo}
                contentFit='contain'
               />
               <View style={ styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>
                    Welcome,
                  </Text>
                  <Text style={styles.usernameText}>
                    {user?.firstName || user?.username || 'User'}
                  </Text>
               </View>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={ styles.addButton} onPress={()=> router.push('/create')}>
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </View>
          </View>
      </View>
    </View>
  )
}