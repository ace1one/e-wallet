import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import  SafeScreen  from "../components/SafeScreen";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import React from "react";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
  return <ClerkProvider tokenCache={tokenCache}>
   {/* <SafeAreaView style={{ flex:1}}> */}
    {/* <SafeScreen> */}
    <Slot />
    <Toast />
    {/* </SafeScreen> */}
   
     {/* </SafeAreaView> */}
 
</ClerkProvider>
}
