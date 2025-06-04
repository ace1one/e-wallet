import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors';
import { Image } from "expo-image";
import ErrorContainer from '@/components/ErrorContainer';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [first_name, setFirstname] = React.useState('')
  const [last_name, setLastname] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    setError('') // Reset error state
    setLoading(true)
    try {
      await signUp.create({
        firstName: first_name,
        lastName: last_name,
        emailAddress,
        username,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }finally{
      setLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={ styles.container}>
        <Text style={ styles.verificationTitle}>Verify your email</Text>
        <ErrorContainer error={error} onClose={() => setError('')} />
        <TextInput
         style={[ styles.verificationInput, error && styles.errorInput ]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={ styles.button }>
          <Text style={ styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
<View style={styles.SignUpContainer}>
  <View style={styles.container}>
    <Image source={require('../../assets/images/revenue-i2.png')} style={styles.illustration} />
    <Text style={styles.title}>Create Account</Text>
    
    <ErrorContainer error={error} onClose={() => setError('')} />

    {/* First + Last Name */}
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={first_name}
          placeholder="Enter first name"
          placeholderTextColor={COLORS.placeholder}
          onChangeText={setFirstname}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={last_name}
          placeholder="Enter last name"
          placeholderTextColor={COLORS.placeholder}
          onChangeText={setLastname}
        />
      </View>
    </View>

    {/* Email */}
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor={COLORS.placeholder}
        autoComplete="email"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
    </View>

    {/* Username */}
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={username}
        autoCapitalize="none"
        placeholder="Enter username"
        placeholderTextColor={COLORS.placeholder}
        onChangeText={setUsername}
      />
    </View>

    {/* Password */}
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor={COLORS.placeholder}
        onChangeText={setPassword}
      />
    </View>

    {/* Continue Button */}
    <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
      <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Continue'}</Text>
    </TouchableOpacity>

    {/* Footer */}
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

  )
}