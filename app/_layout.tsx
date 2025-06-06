import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import  SafeScreen  from "../components/SafeScreen";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import React from "react";
import Toast from 'react-native-toast-message';
export default function RootLayout() {
  return <ClerkProvider tokenCache={tokenCache}>
    <SafeScreen>
    <Slot />
    <Toast />
    </SafeScreen>
 
</ClerkProvider>
}
