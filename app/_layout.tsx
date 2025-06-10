import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import  SafeScreen  from "../components/SafeScreen";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import React from "react";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
export default function RootLayout() {
  return (
   <>
    {/* <IconRegistry icons={EvaIconsPack} /> */}
    <ApplicationProvider {...eva} theme={eva.light}>
<ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
   {/* <SafeAreaView style={{ flex:1}}> */}
    {/* <SafeScreen> */}
    <Slot />
    <Toast />
    {/* </SafeScreen> */}
   
     {/* </SafeAreaView> */}
 
</ClerkProvider>
    </ApplicationProvider>
   </>
   
  
  )
}
