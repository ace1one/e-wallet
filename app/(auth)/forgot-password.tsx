import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { styles } from '@/assets/styles/auth.styles';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';
import ErrorContainer from '@/components/ErrorContainer';

export default function ForgotPasswordScreen() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = code + password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendResetCode = async () => {
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setStep(2);
    } catch (err) {
        if (err instanceof Error) {
        setError(err.message);
        }
    //   setError(err?.errors?.[0]?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!isLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        router.replace('/'); // Navigate to home or login
      } else {
        console.log('Needs more steps:', result);
      }
    } catch (err) {
        if( err instanceof Error) {
        setError(err.message);
        }   
    //   setError(err?.errors?.[0]?.message || err.message || 'Invalid code or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <ErrorContainer error={error} onClose={() => setError('')} />

      {step === 1 ? (
        <>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.placeholder}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity onPress={sendResetCode} style={styles.button} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Code'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholder="Enter code"
            placeholderTextColor={COLORS.placeholder}
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholder="Enter new password"
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={resetPassword} style={styles.button} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
