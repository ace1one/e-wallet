import { useSignIn } from '@clerk/clerk-expo'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { styles } from '@/assets/styles/auth.styles'
import { Image } from 'expo-image'
import ErrorContainer from '@/components/ErrorContainer'
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons'


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [identifier, setIdentifier] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  useFocusEffect(
    useCallback(() => {
      setError('') // Reset error when page is focused
    }, [])
  )
  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    setError('')
    setLoading(true)
    try {
      const signInAttempt = await signIn.create({
        identifier,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }finally {
      setLoading(false)
    }
  }

  return (
    <View style={ styles.container}>
      {/* <Text style={styles.appTitle}>E-Wallet</Text> */}
      <Image source={require('../../assets/images/revenue-i4.png')} style={ styles.illustration} />
      <Text style={ styles.title}>Sign in</Text>
      <ErrorContainer error={error} onClose={() => setError('')} />
      <View style={[styles.inputIcon, error && styles.errorInput]}>
          <Ionicons
            name='person-outline'
            size={20}
            color={COLORS.text}
            style={styles.inputLeftIcon}
          />
          <TextInput
            style={[styles.inputIconText, error && styles.errorInput]}
            autoCapitalize="none"
            value={identifier}
            placeholder="Enter email or username"
            placeholderTextColor={COLORS.placeholder}
            onChangeText={(identifier) => setIdentifier(identifier)}
          />
      </View>


      {/* <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      /> */}

        <View style={[styles.inputIcon, error && styles.errorInput]}>
          <Ionicons
            name='lock-closed-outline'
            size={20}
            color={COLORS.text}
            style={styles.inputLeftIcon}
          />
        <TextInput
          style={styles.inputIconText}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          autoCapitalize="none"
         
          accessibilityLabel="Password"
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
        >
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.text}
            style={styles.inputRightIcon}
          />
        </TouchableOpacity>
      </View>


      <View style={ styles.forgotPasswordContainer}>
        <Link href="/forgot-password" asChild>
          <TouchableOpacity>
            <Text style={ styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
      </View>
     <TouchableOpacity onPress={onSignInPress} style={styles.button} disabled={loading}>
    {loading ? (
      <Text style={styles.buttonText}>Loading...</Text> // Replace with spinner if you prefer
    ) : (
      <Text style={styles.buttonText}>Continue</Text>
    )}
  </TouchableOpacity>

      <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/sign-up" asChild>
          <TouchableOpacity>
              <Text style={ styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          </Link>
        </View>
    </View>
  )
}