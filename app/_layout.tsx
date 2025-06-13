import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import  SafeScreen  from "../components/SafeScreen";
// import { tokenCache } from '@clerk/clerk-expo/token-cache'
import React from "react";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { customTheme} from '../constants/custom-theme.js';
import * as SecureStore from 'expo-secure-store';
import DebugToken from "./(auth)/debugComponent";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  // const tokenCache = {
  //   getToken: async () => {
  //     const token = await SecureStore.getItemAsync('clerk_token');
  //     console.log('[Clerk] Retrieved token:', token); // Add this for debugging
  //     return token;
  //   },
  //   saveToken: async (token: string) => {
  //     console.log('[Clerk] Saving token:', token); // Add this for debugging
  //     await SecureStore.setItemAsync('clerk_token', token);
  //   },
  // };
  return (
   <>
    {/* <IconRegistry icons={EvaIconsPack} /> */}
    <ApplicationProvider {...eva} theme={customTheme}>
<ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
   {/* <SafeAreaView style={{ flex:1}}> */}
    {/* <SafeScreen> */}
    <Slot />
    <DebugToken />
    <Toast />
    {/* </SafeScreen> */}
   
     {/* </SafeAreaView> */}
 
</ClerkProvider>
    </ApplicationProvider>
   </>
   
  
  )
}
